# Proposal: Migrar Reparaciones a Supabase DB

## Intent

Reemplazar el backend mockeado con `json-server` por Supabase Postgres para la entidad `repairs`, manteniendo la forma denormalizada actual y separando el **id interno** (uuid) de un **`ticket_code` legible** (`ORD-XXXXXXXX`) que es lo que el cliente final tipea en `/consulta`. La meta concreta es que el admin siga creando y editando reparaciones normalmente, y que un cliente anónimo pueda consultar su orden con el ticket, todo bajo Row Level Security real con `SECURITY DEFINER` para el lookup público.

Esto deja el proyecto en una posición de portfolio seria: la seguridad ya no vive en el frontend y el modelo se puede extender a `clients`/`products` con FKs en cambios futuros sin romper la capa de auth.

## Scope

### Incluido

- 1 tabla Postgres `repairs` con PK `uuid`, `owner_id uuid references auth.users`, `ticket_code text unique not null`, `created_at timestamptz default now()`, y los 10 campos de negocio actuales.
- RLS activado: 3 policies para `authenticated` (select/insert/update/delete con `auth.uid() = owner_id`); **0 policies para `anon`** (queda bloqueado por default).
- Función `get_repair_by_ticket(ticket_code text) returns repairs` con `SECURITY DEFINER`, `set search_path = public`, acceso via `supabase.rpc()`.
- Trigger `BEFORE INSERT` que genera `ticket_code = 'ORD-' || upper(random_alphanumeric(8))` con retry por unique violation.
- Reemplazo total de `src/services/repairsApi.ts` para usar `supabase.from('repairs')` y `supabase.rpc('get_repair_by_ticket', { t })` en el lookup de la ruta pública.
- Acoplamiento de `addRepair` con `useAuthStore.getState().user.id` para setear `owner_id` automáticamente. Falla explícita si no hay sesión.
- `RepairStatus` (pública) y `useRepairSearch` cambian a buscar por `ticket_code` en vez de por id.
- `src/utils/helpers.ts#traducirError` extendido con mapeos para `42501` (RLS denied), `23505` (unique violation en ticket_code), `PGRST116` (no rows), `23503` (FK).
- Seed SQL idempotente con los ~33 registros limpios de `server/db.json` (post-dedupe del id `"5"` duplicado y de los ids numéricos 1-5).
- Borrado de `getRepairsByStatus` de `repairsApi.ts` (dead code). `deleteRepair` queda implementado y listo para el botón futuro.

### Fuera de alcance (explícito)

| Item | Por qué se difiere |
|------|-------------------|
| Bug pre-existente `cardProduct.tsx` líneas 64-66 (options en inglés) | Scope creep. Se fixea en su propio PR. |
| Normalización de `clients` y `products` con FKs | El título del change es "reparaciones". Cambio aparte, encadenado. |
| Realtime subscriptions | Otro change. La carga imperativa actual sigue funcionando. |
| CLI de Supabase + migrations locales | El proyecto es chico. Los `.sql` se commitean y se aplican via Dashboard. |
| Test runner (Vitest) + tests de la migración | No hay runner en el repo. `tsc -b` + `npm run lint` son la verificación. |
| Renombrar `userRepairsState` → `useRepairsStore` | Naming confuso pero no roto. Limpieza aparte. |
| Botón "Eliminar reparación" en la UI | La acción está lista en store/api; ningún componente la invoca hoy. |
| Borrar `server/db.json` del repo | Queda legacy. Borrar es scope creep. |

## Approach (Opción B — RLS con owner_id + ticket_code + SECURITY DEFINER)

### Schema

```sql
create table public.repairs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  ticket_code text unique not null,
  nombreCliente text not null,
  apellidoCliente text not null,
  telefonoCliente text not null,
  emailCliente text not null,
  nombreProducto text not null,
  marcaModelo text not null,
  estado text not null check (estado in ('analisis','proceso','finalizado')),
  problemaReportado text not null,
  precioPresupuestado numeric(12,2) not null,
  observacionesTecnicas text not null,
  created_at timestamptz not null default now()
);
create index repairs_owner_id_idx on public.repairs(owner_id);
create index repairs_ticket_code_idx on public.repairs(ticket_code);
alter table public.repairs enable row level security;
```

### RLS policies (3 para `authenticated`, 0 para `anon`)

```sql
-- authenticated: cada uno ve/edita/borra solo lo suyo
create policy "repairs_select_own" on public.repairs
  for select to authenticated using (auth.uid() = owner_id);
create policy "repairs_insert_own" on public.repairs
  for insert to authenticated with check (auth.uid() = owner_id);
create policy "repairs_update_own" on public.repairs
  for update to authenticated using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "repairs_delete_own" on public.repairs
  for delete to authenticated using (auth.uid() = owner_id);
-- anon: SIN policies. La policy default deny lo bloquea.
```

### Función pública de lookup

```sql
create or replace function public.get_repair_by_ticket(t text)
returns public.repairs
language sql
security definer
set search_path = public
stable
as $$
  select * from public.repairs where ticket_code = upper(t) limit 1;
$$;
-- Acceso: la función es callable desde anon via supabase.rpc() porque
-- SECURITY DEFINER la ejecuta con permisos del owner. La policy de la
-- tabla no aplica dentro de la función. anon no puede hacer SELECT directo.
```

### Trigger de `ticket_code`

```sql
create or replace function public.assign_ticket_code()
returns trigger language plpgsql as $$
declare
  candidate text;
  attempt int := 0;
begin
  while attempt < 5 loop
    candidate := 'ORD-' || upper(substring(replace(gen_random_uuid()::text,'-','') from 1 for 8));
    begin
      new.ticket_code := candidate;
      return new;
    exception when unique_violation then
      attempt := attempt + 1;
    end;
  end loop;
  raise exception 'No se pudo generar ticket_code único';
end $$;

create trigger repairs_ticket_code_bi
  before insert on public.repairs
  for each row execute function public.assign_ticket_code();
```

### Frontend

- `repairsApi.ts` reescrito: `getRepairs`/`postRepairs`/`updateRepair`/`deleteRepair` usan `supabase.from('repairs').select/insert/update/delete`; `getRepairById` se reemplaza por `supabase.rpc('get_repair_by_ticket', { t })` (la firma cambia de `(id)` a `(ticketCode)`).
- `store/repairs.ts`: `addRepair` lee `useAuthStore.getState().user.id` y lo agrega al payload antes de `postRepairs`. Si no hay sesión, lanza error con `traducirError`.
- `useRepairSearch` y `RepairStatus`: el input pide `ticket_code`; el placeholder ya decía "ORD-2024" — la UI estaba pensada para tickets, solo no se cumplía. La migración alinea código con intención.
- `detailRepair.tsx` y `editRepairProduct.tsx` siguen recibiendo el `id` por `useParams` (es el uuid interno de la ruta `/private/admin/reparacion/:repairId`), pero la UI muestra el `ticket_code` como "Orden: ORD-XXXXXXXX".
- `traducirError` extendido: cualquier `code` de Postgres/PostgREST que llegue se mapea a español. Si no hay match, fallback a "Error al procesar la reparación".

## Capabilities (contrato con sdd-spec)

### New Capabilities
- `repairs` — dominio de la entidad reparación: persistencia en Postgres, RLS, `ticket_code` legible, flujo de consulta pública vía RPC, y CRUD privado por owner.

### Modified Capabilities
- None. `openspec/specs/` está vacío (es el primer change que introduce specs propias).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `supabase/sql/0001_repairs_schema.sql` | New | Tabla + índices + RLS policies + función + trigger. |
| `supabase/sql/0002_repairs_seed.sql` | New | Inserta los ~30 registros limpios con `owner_id` placeholder (admin de seed). |
| `src/services/repairsApi.ts` | Modified (rewrite) | `fetch` → `supabase.from('repairs')` + `supabase.rpc('get_repair_by_ticket', { t })`. |
| `src/store/repairs.ts` | Modified | `addRepair` lee `useAuthStore`. `loadRepairById` pasa `ticket_code` al RPC. `loadRepairs` filtra implícito por RLS. |
| `src/hooks/useRepairSearch.ts` | Modified | Input pide `ticket_code`, no id. |
| `src/components/client/RepairStatus.tsx` | Modified | Display: `Orden: {repair.ticket_code}` en vez de `{repair.id}`. |
| `src/components/repairs/{productIntaketNew,detailRepair,editRepairProduct,repairsList,RepairsTableView}.tsx` | Modified (mínimo) | Muestran el `ticket_code` en la UI; el uuid interno sigue siendo el identificador de las rutas privadas. |
| `src/utils/helpers.ts` | Modified | `traducirError` extendido con códigos de Postgres/PostgREST. |
| `src/types/database.types.ts` | New (opcional) | Tipos autogenerados vía `supabase gen types` (recomendado: hacerlo en un PR posterior). |
| `package.json` | Unchanged | `@supabase/supabase-js@^2.106.2` ya está. |
| `server/db.json` | Unchanged (legacy) | Anotar en el README que quedó obsoleto. No se borra. |
| `README.md` | Modified (mínimo) | Nota: json-server ya no se usa; los datos viven en Supabase. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `addRepair` falla sin sesión activa (acoplamiento con auth) | High | La ruta `/private/admin/reparacion/nueva` está bajo `PrivateGuard` → en teoría siempre hay sesión. Smoke test obligatorio en PR B. Falla explícita con mensaje claro. |
| Cambiar el input de `/consulta` de id corto a ticket rompe UX existente | Med | El placeholder ya dice "ORD-2024" — la UI ya estaba pensada para tickets, solo no se cumplía. La migración alinea código con intención. |
| Seed puede fallar si el trigger genera colisiones en `ticket_code` | Low | El trigger hace retry con loop hasta 5 intentos. Si falla, log + manual fix. |
| `/consulta` y `/private/admin` comparten `userRepairsState` con RLS por `owner_id` | Med | El lookup público usa `supabase.rpc()` con `SECURITY DEFINER`, NO usa el store. El store se usa solo en rutas privadas con sesión. La separación queda explícita en el código. |
| Tests no existen: regresiones silenciosas posibles | Med | `npx tsc -b` + `npm run lint` antes de mergear. Smoke test manual documentado en el PR description. |
| Bug pre-existente `cardProduct.tsx` queda y rompe el `updateRepair` cuando se edita | Med | NO es bloqueante para mergear PR B porque el bug solo afecta al select de estado. El admin puede seguir editando el resto de los campos. Se fixea en su propio PR. |

## Rollback Plan

- **PR A (SQL)**: reversible 100% ejecutando `drop table if exists public.repairs cascade; drop function if exists public.get_repair_by_ticket(text); drop function if exists public.assign_ticket_code();` en el SQL editor de Supabase. No toca código de la app → cero impacto en master.
- **PR B (frontend)**: revertible con `git revert <sha>` del merge commit. Vuelve al cliente que consume json-server. Los datos de Supabase no se borran automáticamente → si después mergearon de nuevo, los datos siguen ahí.

## PR Plan (chained, stacked-to-main)

### PR A — Schema, RLS, función, trigger y seed (SQL only)

- Crea `supabase/sql/0001_repairs_schema.sql` y `0002_repairs_seed.sql`.
- Se aplican via Dashboard de Supabase (o `psql` si tenés acceso).
- **No toca código de la app** → la app sigue funcionando con json-server después de mergear A.
- Verificación manual desde el Dashboard (con la SQL editor):

| Query (como rol) | Esperado |
|---|---|
| `select count(*) from repairs;` (anon) | 0 rows (RLS bloquea) |
| `select count(*) from repairs;` (authenticated user A) | Solo las repairs con `owner_id = A.uid` |
| `select * from get_repair_by_ticket('ORD-XXXXXXXX');` (anon, ticket real) | 1 row |
| `select * from get_repair_by_ticket('ORD-NOEXISTE');` (anon) | 0 rows |

- Tamaño estimado: ~100-150 líneas de SQL.
- **Bloqueante para PR B**.

### PR B — Refactor del frontend

- Reescribe `src/services/repairsApi.ts`.
- Acopla `addRepair` a `useAuthStore.getState().user.id`.
- Cambia `useRepairSearch` + `RepairStatus` para usar `ticket_code`.
- Extiende `traducirError`.
- Smoke test documentado en el PR description:

  1. Login con un user de prueba.
  2. Crear una reparación desde `/private/admin/reparacion/nueva`.
  3. Ver la lista en `/private/admin`.
  4. Copiar el `ticket_code` que devuelve la API (visible en el response del POST).
  5. Logout.
  6. Ir a `/consulta`, pegar el ticket → ver la reparación sin estar logueado.

- Tamaño estimado: ~250-350 líneas de TS/TSX.
- Encaja en 1 PR dentro del budget.

### Chain strategy

- **PR A mergea primero a master**. No requiere redeploy.
- **PR B mergea después de A**. No se puede implementar B sin A en master porque `repairsApi.ts` apuntaría a una tabla que no existe.
- Ambos van stacked-to-main: cada uno mergea a master con su propio PR (no se acumulan en un mismo branch).
- Si en la implementación PR B se acerca a 400 líneas, se subdivide: B1 (api + traducirError + store wiring) y B2 (UI lookup público + display del ticket). Plan B, no plan A.

## Open Decisions (sub-decisiones dentro de Opción B)

| Decisión | Recomendación | Bloqueante para proposal? |
|----------|---------------|--------------------------|
| Alfabeto del `ticket_code` (¿alfanumérico? ¿excluir 0/O/1/I?) | Alfanumérico upper-case excluyendo 0/O/1/I para evitar confusión al copiar a mano. Formato `ORD-XXXXXXXX` (8 chars). En el trigger actual uso un slice de uuid, que es más simple y estadísticamente seguro; el spec decide si querés purgar chars confusos. | No, lo define el spec. |
| ¿`ticket_code` lo genera la DB con trigger o el cliente antes del insert? | **Trigger en DB**. El cliente no puede colisionar a propósito y la lógica vive en un solo lugar. | No. |
| ¿`fechaIngreso` la setea el cliente o la DB? | **DB con `default now()`**. El cliente deja de mandarla; el schema de Zod la marca como opcional. | No. |
| `precioPresupuestado`: ¿`numeric(12,2)` con el cliente mandando string? | `numeric(12,2)`. El cliente manda string (como hoy); el type cast se hace en el API client antes del insert. | No. |
| ¿`addRepair` falla o tiene fallback si no hay sesión? | **Falla explícita** con `traducirError`. La ruta está bajo `PrivateGuard` → en teoría siempre hay sesión. Si querés un fallback amigable, el spec lo decide. | No. |
| ¿Borrar `deleteRepair` y `getRepairsByStatus`? | Borrar `getRepairsByStatus` (dead code puro). Mantener `deleteRepair` (esperable en un CRUD; la UI no lo invoca pero está listo). | No. |
| ¿`server/db.json` queda en el repo o se borra? | **Queda en el repo, anotado como legacy en el README**. json-server ya no se corre. Borrar el archivo es scope creep. | No. |
| ¿Generar `database.types.ts` con `supabase gen types`? | **Sí, pero en un PR aparte** (tooling). En este PR usamos `any` en el cliente y casteamos con `as Repair`. | No. |

## Size Estimate

| PR | Type | Estimated changed lines | Within 400-line budget? |
|----|------|------------------------|-------------------------|
| PR A | SQL only | ~100-150 | Yes |
| PR B | TS/TSX | ~250-350 | Yes |
| **Total** | mixed | **~350-500** | **Sí, dividido en 2 PRs** dentro del budget |

## Success Criteria

- [ ] La tabla `repairs` existe en Supabase con RLS activado.
- [ ] `get_repair_by_ticket('ORD-XXXX')` funciona con la `anon` key y devuelve 1 row si el ticket existe, 0 si no.
- [ ] Un admin logueado ve solo sus reparaciones en `/private/admin` (verificado con 2 users distintos).
- [ ] Un admin puede crear una reparación y la API devuelve el `ticket_code` generado.
- [ ] Un cliente anónimo puede consultar una reparación con el `ticket_code` en `/consulta` sin estar logueado.
- [ ] `getRepairsByStatus` borrado de la API. `deleteRepair` implementado en store y API.
- [ ] `npx tsc -b` y `npm run lint` pasan sin errores.
- [ ] Smoke test del PR B documentado y ejecutado por el revisor.

## Dependencies

- Supabase project `rrypkwxefdyqlvmojuek.supabase.co` (credenciales ya en `.env`).
- PR de `techrepair-supabase` ya mergeado a master: provee `supabase.ts` (cliente singleton), `useAuthStore` (con `user.id` uuid), `PrivateGuard`, y la sesión persistida.
- Ningún cambio externo de `package.json` (no se instalan deps nuevas).

## Próximo paso

Si aprobás esta propuesta, paso a:

1. `sdd-spec` para escribir los requirements + scenarios (Given/When/Then) de la capability `repairs`.
2. `sdd-design` para detallar la arquitectura: schema, RLS policies exactas, función RPC, flujo de acoplamiento auth, formato de errores.
3. `sdd-tasks` para descomponer en commits/PRs encadenados.

Vos escribís el código, yo planifico y reviso. Avisame si querés ajustar algo antes de pasar a specs.
