# Tasks — PR 2: Supabase Client + Auth

## [x] Task 1: Instalar Supabase

```bash
npm install @supabase/supabase-js
```

**Validación:** `package.json` tiene `@supabase/supabase-js` en dependencias.

---

## [x] Task 2: Crear cliente Supabase

**Archivo:** `src/services/supabase.ts` (nuevo)

Crear el cliente leyendo `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` del entorno. Exportar como `supabase`.

**Validación:** `npx tsc -b` no tira errores.

---

## [x] Task 3: Auth Store

**Archivo:** `src/store/auth.ts` (nuevo)

Store Zustand con:
- Estado: `user`, `session`, `loading`, `error`
- Acciones: `login`, `register`, `logout`, `checkSession`
- `checkSession` se llama al cargar la app (en App.tsx o AppRouter)
- Errores de Supabase traducidos a español

**Validación:** `npx tsc -b` no tira errores.

---

## [x] Task 4: PrivateGuard con sesión real

**Archivo:** `src/guard/PrivateGuard.tsx` (editar)

Reemplazar `isLogged = true` por:
- Leer `user` y `loading` del auth store
- Si loading -> no renderizar nada (o un spinner breve)
- Si hay user -> `<Outlet />`
- Si no hay user -> `<Navigate to="/" />`

**Validación:** Sin sesión, al entrar a `/dashboard` redirige a `/`.

---

## [x] Task 5: LoginForm real

**Archivo:** `src/components/customForm/LoginForm.tsx` (editar)

Reemplazar el `setTimeout` mock por `login(email, password)` del auth store.
- Mostrar error del store si hay
- Redirigir a `/dashboard` después de login exitoso
- Loading state ya existe

**Validación:** Email/password incorrectos -> muestra error. Correctos -> redirige.

---

## [x] Task 6: RegisterForm real

**Archivo:** `src/components/customForm/RegisterForm.tsx` (editar)

Reemplazar el `setTimeout` mock por `register(email, password)` del auth store.
- Mostrar errores de Supabase traducidos
- Redirigir después de registro exitoso

**Validación:** Email repetido -> muestra error.

---

## [x] Task 7: Logout

**Archivo:** `src/components/sidebar.tsx` (editar)

El botón "Cerrar Sesión" actual (ya existe en la sidebar) debe llamar `logout()` del auth store y navegar a `/`.

**Validación:** Click en Cerrar Sesión -> vuelve al landing.

---

## Review Workload Forecast

- **Líneas estimadas:** ~250-300
- **Presupuesto:** 400 líneas
- **Chained PRs:** No, entra en un solo PR
- **Decisión:** Continuar con PR único

## Apply Progress

### Completed
- [x] Task 1: Instalar Supabase — `@supabase/supabase-js` in package.json ✓
- [x] Task 2: Cliente Supabase — `src/services/supabase.ts` created ✓
- [x] Task 3: Auth Store — `src/store/auth.ts` created ✓
- [x] Task 4: PrivateGuard — updated with real session check ✓
- [x] Task 5: LoginForm — uses auth store login ✓
- [x] Task 6: RegisterForm — uses auth store register ✓
- [x] Task 7: Logout — sidebar button wired to logout ✓
