# Proposal: TechRepair Portfolio-Ready + Supabase

## Intent

Transform el proyecto TechRepair de una app con mock backend (json-server) a una aplicación moderna con Supabase + autenticación real, tests, accesibilidad, y polish general para que sea un proyecto **portfolio-ready** que consiga trabajo.

## Alcance

### Incluye

1. **Supabase + Auth real**
   - Reemplazar `json-server` por Supabase (PostgreSQL + API client)
   - Auth con email/password (y opcional Google)
   - Proteger rutas privadas con sesión real
   - RLS (Row Level Security) básico en tablas

2. **Migración de datos**
   - Limpiar `db.json` (sacar registros vacíos)
   - Migrar estructura a tablas Supabase
   - Seed data inicial

3. **Tests** (aprendemos juntos)
   - Instalar Vitest + Testing Library
   - Tests unitarios de componentes clave (formularios, guards, helpers)
   - Tests de integración del store Zustand

4. **Accesibilidad**
   - Roles ARIA en componentes principales
   - Labels en formularios
   - Contraste y focus visible
   - Navegación por teclado

5. **Polish general**
   - README profesional
   - Favicon / título de página
   - Formateo de código (Prettier)
   - Limpiar archivos muertos (pages/, public/, routes/PrivateRoutes.tsx)
   - Variables de entorno (`.env`)

### No incluye (por ahora)

- Backend propio (Express/Fastify) — Supabase ya nos da backend
- Tests E2E (Cypress/Playwright) — muy pesado para portfolio, lo dejamos para después
- CI/CD — podemos agregarlo después si querés
- Dark mode ya está implementado

## Enfoque técnico

### Supabase
- Usar `@supabase/supabase-js` como cliente
- `@supabase/ssr` para manejo de sesión con React Router
- Tablas: `repairs`, `clients`, `products`, `profiles` (vinculada a auth.users)
- Store Zustand se adapta para usar Supabase en vez de fetch directo

### Auth
- Supabase Auth con email/password
- `PrivateGuard` usa `supabase.auth.getSession()` real
- Registro + Login con redirect al dashboard
- Botón de logout

### Tests
- Vitest + React Testing Library + jsdom
- Arrancamos con tests de cosas simples:
  - `PrivateGuard` (render condicional)
  - `customInput` (render, error state)
  - `repairs.ts` store (add, delete, update)
  - helpers/utils

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| Curva de aprendizaje de Supabase | Arrancamos simple, sin RLS complejo al principio |
| Los tests dan miedo si nunca hiciste | Empiezo con tests triviales y subo complejidad |
| El cambio a Supabase puede romper el frontend | Migramos por capas: primero cliente Supabase, después auth, después datos |
| Presupuesto de 400 líneas puede quedarse corto | Dividimos en varios PRs encadenados |

## Estimación inicial

Esto es UN cambio grande. Estimo que supera las 400 líneas cambiadas. Recomiendo dividir en **4 PRs encadenados**:

1. **PR 1 — Setup + Polish**: README, favicon, Prettier, limpieza archivos muertos, env vars. ~200 líneas.
2. **PR 2 — Supabase client + Auth**: Instalar Supabase, crear cliente, migrar auth real. ~300 líneas.
3. **PR 3 — Migración de datos**: Tablas Supabase, migrar repairs/clients/products, adaptar store. ~350 líneas.
4. **PR 4 — Tests + Accesibilidad**: Tests unitarios, ARIA roles, focus management. ~250 líneas.

Total estimado: ~1100 líneas → requiere chained PRs.

## Próximo paso

Si aprobás esta propuesta, paso a escribir las **Specs** (requerimientos detallados por PR).
