# Design — PR 2: Supabase Client + Auth

## Arquitectura general

El reemplazo de json-server + auth mock por Supabase se hace en capas, sin romper el frontend:

```
┌──────────────────────────────────────────┐
│            Componentes (UI)              │
│  LoginForm / RegisterForm / PrivateGuard │
└──────────────┬───────────────────────────┘
               │ llama acciones
┌──────────────▼───────────────────────────┐
│         Store Zustand (auth.ts)          │
│  login() / register() / logout() /       │
│  checkSession()                          │
└──────────────┬───────────────────────────┘
               │ usa cliente
┌──────────────▼───────────────────────────┐
│       services/supabase.ts               │
│  cliente Supabase (singleton)            │
└──────────────┬───────────────────────────┘
               │
        Supabase Cloud (Auth + DB)
```

## 1. Cliente Supabase (`src/services/supabase.ts`)

Archivo nuevo. Crea y exporta el cliente de Supabase:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan variables de entorno VITE_SUPABASE_*");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Concepto clave:** `createClient` devuelve un objeto con `supabase.auth`, `supabase.from()` (para queries), etc. Lo importás donde lo necesites.

## 2. Auth Store (`src/store/auth.ts`)

Store de Zustand que encapsula toda la lógica de autenticación.

### Estado

```typescript
interface AuthState {
  user: User | null;        // datos del usuario logueado
  session: Session | null;  // sesión activa (token, refresh)
  loading: boolean;         // mientras verifica sesión o hace login
  error: string | null;     // último error (traducido a español)
}
```

### Acciones

| Acción | Llama a Supabase | Qué hace |
|--------|-----------------|----------|
| `login(email, password)` | `supabase.auth.signInWithPassword()` | Inicia sesión, guarda user/session |
| `register(email, password)` | `supabase.auth.signUp()` | Crea cuenta, guarda user/session |
| `logout()` | `supabase.auth.signOut()` | Limpia estado, redirige |
| `checkSession()` | `supabase.auth.getSession()` | Restaura sesión al recargar |

### Flujo al iniciar la app

```
App monta
  └─ checkSession()
       └─ supabase.auth.getSession()
            ├─ hay sesión → user + session en el store
            └─ no hay sesión → user = null, session = null
```

Supabase **ya maneja el refresh del token automáticamente** — no necesitás hacer nada extra.

## 3. PrivateGuard

Hoy:
```tsx
const isLogged = true; // 👎 fijo
```

Mañana:
```tsx
const { user, loading } = useAuthStore();

if (loading) return <Spinner />;
return user ? <Outlet /> : <Navigate to="/" />;
```

Lee `user` del store de auth. Mientras `loading` es true (porque `checkSession` está corriendo), muestra un spinner o nada. Después, si hay user, deja pasar; si no, redirige al landing.

## 4. LoginForm

Hoy usa un `setTimeout` de mentira. Mañana llama a `login(email, password)` del store.

```typescript
const { login, loading, error } = useAuthStore();

const onSubmit = async (data) => {
  await login(data.email, data.password);
  // si no hay error, redirigir al dashboard
  navigate("/dashboard");
};
```

Importante: el mensaje de error de Supabase viene en inglés. Hay que mapearlo a español:
- "Invalid login credentials" → "Credenciales inválidas"
- "Email not confirmed" → "Email no confirmado"
- Otros → "Error al iniciar sesión"

## 5. RegisterForm

Misma lógica que LoginForm pero llamando `register(email, password)`.

El `registerSchema` actual tiene `nombre`, `email`, `password`, `confirmPassword`. Supabase solo necesita `email` y `password`. El `nombre` lo podemos ignorar por ahora o guardarlo en el perfil después (PR 3).

## 6. Logout

En la sidebar o header del dashboard, un botón que llame `logout()` del store y después navegue a `/`.

## Orden de implementación

1. **Instalar Supabase** — `npm install @supabase/supabase-js`
2. **Crear `src/services/supabase.ts`** — cliente singleton
3. **Crear `src/store/auth.ts`** — store de auth
4. **Actualizar `PrivateGuard.tsx`** — sesión real
5. **Actualizar `LoginForm.tsx`** — login real
6. **Actualizar `RegisterForm.tsx`** — registro real
7. **Agregar logout** — botón en sidebar

Cada paso se prueba antes de pasar al siguiente (`npm run dev`).
