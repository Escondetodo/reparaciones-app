# Specs — PR 2: Supabase Client + Auth

## 1. Cliente Supabase

### Requerimientos
- [ ] Instalar `@supabase/supabase-js`
- [ ] Crear `src/services/supabase.ts` con el cliente configurado
- [ ] Usar `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` del `.env`
- [ ] Exportar el cliente como `supabase` para usarlo desde cualquier lado

### Criterios de aceptación
- El cliente se crea una sola vez (singleton)
- Si las env vars faltan, lanza un error claro en dev

---

## 2. Auth Store (Zustand)

### Requerimientos
- [ ] Crear `src/store/auth.ts` con las siguientes acciones:
  - `login(email, password)` -> llama `supabase.auth.signInWithPassword()`
  - `register(email, password)` -> llama `supabase.auth.signUp()`
  - `logout()` -> llama `supabase.auth.signOut()`
  - `checkSession()` -> llama `supabase.auth.getSession()` al iniciar la app
- [ ] Estado: `user`, `session`, `loading`, `error`
- [ ] Persistir sesión (Supabase ya maneja el refresh automático)

### Criterios de aceptación
- Al recargar la página, la sesión se mantiene
- logout limpia la sesión y redirige al login
- Los errores de Supabase se traducen a mensajes en español

---

## 3. PrivateGuard

### Requerimientos
- [ ] Reemplazar `isLogged = true` por `supabase.auth.getSession()` real
- [ ] Mostrar loading mientras verifica sesión
- [ ] Redirigir a `/` si no hay sesión

### Criterios de aceptación
- Sin sesión -> redirige al landing
- Con sesión -> deja pasar al dashboard

---

## 4. Login

### Requerimientos
- [ ] `LoginForm.tsx` usa el auth store en vez de `setTimeout` mock
- [ ] Muestra error si credenciales inválidas
- [ ] Después de login exitoso, redirige al dashboard (`/dashboard`)

### Criterios de aceptación
- Email/password válidos -> entra al dashboard
- Email/password inválidos -> muestra error ("Credenciales inválidas")
- Loading state mientras se autentica

---

## 5. Registro

### Requerimientos
- [ ] `RegisterForm.tsx` usa el auth store en vez de `setTimeout` mock
- [ ] Muestra error si el registro falla (email ya existe, etc.)
- [ ] Después de registro exitoso, muestra mensaje de confirmación o redirige

### Criterios de aceptación
- Email nuevo + password -> se registra y redirige
- Email existente -> muestra error "El email ya está registrado"

---

## 6. Logout

### Requerimientos
- [ ] Agregar botón de cerrar sesión en la sidebar y/o header del dashboard
- [ ] Al hacer logout, redirige al landing

### Criterios de aceptación
- Click en "Cerrar sesión" -> limpia sesión -> vuelve al landing

---

## Modo de entrega

- Trabajamos en la branch `feat/pr2-supabase-auth`
- Instalación de dependencias primero
- Store de auth después
- PrivateGuard después
- Login + Register después
- Logout al final
- Vos commitás cuando quieras
