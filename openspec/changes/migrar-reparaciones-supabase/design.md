# Design: Migrar Reparaciones a Supabase DB

## Technical Approach

Reemplazar `json-server` con Supabase Postgres para la entidad `repairs`. Dos PRs encadenados: PR A crea schema/RLS/función/trigger/seed (SQL only), PR B reescribe el API client y wiring del store. La forma denormalizada actual se preserva — para los componentes UI el cambio es transparente.

## Architecture Decisions

### ticket_code: trigger en DB, no cliente

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Cliente genera en JS | Colisión posible, lógica duplicada | ❌ |
| Trigger `BEFORE INSERT` en DB | Single source of truth, retry loop integrado | ✅ |

Formato `ORD-XXXXXXXX` (8 chars upper-hex vía slice de `gen_random_uuid()`). Loop hasta 5 intentos ante `unique_violation`. Falla con `raise exception` si se agota.

### owner_id: lectura explícita desde auth store

`addRepair` ejecuta `useAuthStore.getState().user.id` antes de `postRepairs`. Sin sesión → `throw` con `traducirError`. La ruta de creación está bajo `PrivateGuard` (siempre hay sesión en la práctica), pero el chequeo explícito elimina riesgo de corrupción silenciosa.

### Lookup público: RPC con SECURITY DEFINER

Función `get_repair_by_ticket(t)` con `security definer`, `set search_path = public`, `upper(t)` para case-insensitive match. Anon no puede hacer `SELECT` directo (RLS default deny). La función es el único gate de acceso público.

### created_at / fechaIngreso: mapping en API layer

DB usa `created_at timestamptz default now()`. El frontend mantiene `fechaIngreso` en la interfaz `Repair` — la capa API mapea `created_at` → `fechaIngreso` al leer, y omite el campo al insertar. Minimiza cambios en componentes (~6 archivos).

### precioPresupuestado: string en UI, numeric en DB

| Capa | Tipo | Acción |
|------|------|--------|
| DB | `numeric(12,2)` | Almacena precisión exacta |
| Supabase client | `number` | Devuelve float |
| Frontend interface | `string` | `String(value)` al leer, `parseFloat(value)` al escribir |

### Estado: doble validación (Zod + CHECK)

DB `CHECK (estado IN ('analisis','proceso','finalizado'))` espeja el `z.enum([...])` de Zod. Zod ataja errores antes del roundtrip, DB previene corrupción en storage.

### Seed: idempotente con ON CONFLICT DO NOTHING

Registros deduplicados de `server/db.json` (eliminados id duplicado `"5"` e ids numéricos 1-5). Admin `owner_id` usa placeholder UUID — el user debe existir en `auth.users`.

### Error handling: extensión de traducirError

| Código | Origen | Mensaje |
|--------|--------|---------|
| `42501` | RLS violation | "No tenés permiso para acceder a esta reparación" |
| `23505` | Unique violation (ticket) | "El código de ticket ya existe. Intentalo de nuevo." |
| `PGRST116` | RPC sin filas | "No se encontró ninguna reparación con ese ticket" |
| `23503` | FK violation | "El usuario referenciado no existe" |
| fallback | — | "Error al procesar la reparación" |

Los errores llegan como `error.code` (PG) o `error.code` del `PostgrestError`. Se matchean en un `Record<string, string>` dentro de `traducirError`.

## Data Flow

```
PRIVADO (authenticated):
  RepairsList → loadRepairs → supabase.from('repairs').select('*')
                                ↳ RLS filtra por auth.uid() = owner_id

  NewRepair → addRepair → useAuthStore.getState().user.id
              → postRepairs → supabase.from('repairs').insert({..., owner_id})
              ↳ Trigger asigna ticket_code automáticamente

  DetailRepair → loadRepairById(uuid) → supabase.from('repairs')
                  .select('*').eq('id', uuid).single()

PÚBLICO (anonymous):
  RepairStatus → handleLoadRepairById(ticket)
                → supabase.rpc('get_repair_by_ticket', { t: ticket })
                ↳ SECURITY DEFINER — bypass RLS, devuelve row o zero
```

## File Changes

### PR A — SQL only (2 files new)

| File | Acción |
|------|--------|
| `supabase/sql/0001_repairs_schema.sql` | Crear |
| `supabase/sql/0002_repairs_seed.sql` | Crear |

### PR B — Frontend (7 files modified)

| Archivo | Acción | Detalle |
|---------|--------|---------|
| `src/services/repairsApi.ts` | Rewrite | `fetch` → `supabase.from('repairs')`. Eliminar `getRepairsByStatus`. Interfaz `Repair` agrega `owner_id`, `ticket_code`. Mapping `created_at` ↔ `fechaIngreso`, cast `number` ↔ `string` en precio. |
| `src/store/repairs.ts` | Modify | `addRepair` inyecta `owner_id` desde `useAuthStore`. Remover `clients:[]`, `products:[]` del estado inicial (dead keys). |
| `src/hooks/useRepairSearch.ts` | Modify | Sin cambios de firma — el hook ya llama `loadRepairById(ticketId)`. El store redirige al RPC. |
| `src/components/client/RepairStatus.tsx` | Modify | Línea 95: `{repairById?.id}` → `{repairById?.ticket_code}`. |
| `src/utils/helpers.ts` | Modify | Extender `traducirError` con mapa de códigos PG. |
| `src/components/repairs/productIntaketNew.tsx` | Modify | Eliminar `fechaIngreso: new Date().toISOString()` — DB setea `created_at`. |
| `README.md` | Modify | Nota: json-server obsoleto, datos en Supabase. |

## Interfaces / Contracts

```typescript
// Nueva interfaz Repair (repairsApi.ts)
export interface Repair {
  id: string;
  owner_id: string;
  ticket_code: string;
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  emailCliente: string;
  nombreProducto: string;
  marcaModelo: string;
  fechaIngreso: string;           // mapeado desde created_at
  estado: EstadoRepair;
  problemaReportado: string;
  precioPresupuestado: string;    // casteado desde number
  observacionesTecnicas: string;
}

// Mapping en API layer (postRepairs)
// → DB: { ...data, owner_id, created_at: undefined, precioPresupuestado: parseFloat(data.precioPresupuestado) }
// Mapping en API layer (getRepairs)
// ← UI: { ...record, fechaIngreso: record.created_at, precioPresupuestado: String(record.precioPresupuestado) }
```

## Testing Strategy

| Capa | Qué | Cómo |
|------|-----|------|
| Type check | Todo compila | `npx tsc -b` |
| Lint | Sin regresiones | `npm run lint` |
| Smoke PR A | RLS, RPC, trigger | 4 queries via Dashboard SQL editor |
| Smoke PR B | CRUD + lookup público | Flujo manual documentado en PR description |

## Migration / Rollout

PR A se deploya (SQL se aplica) antes de mergear PR B. Sin feature flag — post-PR B todo el tráfico usa Supabase. Rollback: `git revert` PR B, luego `DROP TABLE ... CASCADE` PR A.

## Open Questions

- [ ] Confirmar UUID del admin seed para `owner_id` en el seed SQL
- [ ] ¿`detailRepair.tsx` línea 45 muestra `ticket_code` en vez del uuid interno? Propuesta sugiere que sí, es cambio cosmético no bloqueante
