# Tasks: Acceso Restringido

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~100-150 |
| 400-line budget risk | Low |
| Chained PRs | No |
| Decision | PR único |

---

## Task 1: Eliminar ruta de registro público

**Archivo:** `src/AppRouter.tsx`

### Pasos
1. Eliminar la línea: `<Route path="/registro" element={<RegisterlUser />} />`
2. Verificar que `import RegisterlUser from "./components/auth/RegisterlUser"` ya no se usa o se mantiene (si hay warning de unused import, dejarlo o silenciarlo)

**Validación**
- Navegar a `/registro` → muestra `RoutesNotFound` (404)
- El componente `RegisterlUser.tsx` sigue existiendo en el código (no se borra)
- `npm run lint` no tiene errores nuevos

---

## Task 2: Agregar "Olvidé mi contraseña" al login

**Archivo:** `src/components/auth/login.tsx`

### Pasos

- [x] 1. Agregar estado local `mode: "login" | "forgot"` en el componente Login
- [x] 2. Si `mode === "login"`: mostrar el formulario de login actual + link "¿Olvidaste tu contraseña?"
- [x] 3. Si `mode === "forgot"`: mostrar formulario con:
   - Campo email (usando `CustomInput` y schema Zod)
   - Botón "Enviar link de recuperación"
   - Link "Volver al inicio de sesión"
- [x] 4. Al enviar, llamar a `supabase.auth.resetPasswordForEmail(email)`
- [x] 5. Mostrar mensaje de éxito: "Te enviamos un link para restablecer tu contraseña"
- [x] 6. Manejar errores (email inválido, rate limiting de Supabase)

**Detalles técnicos**
- [x] Reusar `CustomInput` y los schemas de Zod que ya existen en `src/schemas/auth.ts`
- [x] Agregar schema de validación para el email en `src/schemas/auth.ts` (ya existía, no requirió cambios)
- [x] Usar `traducirError` para errores de Supabase

**Validación**
- [x] En `/login` se ve el link "¿Olvidaste tu contraseña?"
- [x] Click → muestra formulario de email
- [x] Email válido → mensaje de éxito
- [x] Email inválido/vacío → error de validación
- [x] "Volver" → regresa al login
- [x] `npx tsc -b` y `npm run lint` pasan

---

## Task 3: Limpiar warnings de ESLint

**Archivos:** Múltiples (4 warnings de useEffect)

### Warnings a corregir

| Archivo | Línea | Warning |
|---------|-------|---------|
| `src/components/repairs/detailRepair.tsx` | 28 | `useEffect` missing dep: `loadRepairById` |
| `src/components/repairs/editRepairProduct.tsx` | 42 | `useEffect` missing dep: `loadRepairById` |
| `src/components/repairs/productIntaketNew.tsx` | 56 | `useEffect` missing dep: `loadRepairs` |
| `src/hooks/useRepairSearch.ts` | 18 | `useEffect` missing dep: `clearRepairById` |

### Estrategia de corrección

Para cada caso, evaluar:
- Si la función es estable (viene de Zustand, no cambia entre renders) → agregarla al array de dependencias
- Si la función cambia en cada render → usar `useCallback` en el store o wrappear con `useEffect` solo con las vars que cambian

**Nota:** Las funciones de Zustand (`loadRepairById`, `loadRepairs`, `clearRepairById`) son referencias estables porque Zustand las mantiene fijas. Agregarlas al array de dependencias no causa loops infinitos.

**Validación**
- `npm run lint` no muestra warnings de deps faltantes

---

## Task 4: Revisar README (pendiente de revisión conjunta)

READme ya fue escrito en sesión anterior. Pendiente de revisar juntos y ajustar.

---

## Task 5: Página de cambio de contraseña (/update-password)

**Archivos nuevos:** `src/components/auth/UpdatePassword.tsx`, ruta en `AppRouter.tsx`

### Pasos
1. Crear componente `UpdatePassword` con formulario de nueva contraseña + confirmación
2. Agregar ruta `/update-password` pública en `AppRouter.tsx`
3. Al enviar, llamar a `supabase.auth.updateUser({ password })`
4. Redirigir a `/login` con mensaje de éxito
5. Manejar errores (token expirado, contraseña débil)

**Validación**
- Click en link del mail → formulario de nueva contraseña
- Contraseña válida → éxito + redirección a login
- Token expirado → mensaje de error

---

## Task 6: Bug signo $ en formularios de reparación

**Archivos:** `src/components/repairs/productIntaketNew.tsx`, `src/components/repairs/editRepairProduct.tsx`

### Pendiente
- Investigar dónde aparece el `$` y por qué
- Corregir display del signo pesos en precios

**Archivo:** `README.md`

### Qué agregar

1. **Contexto del proyecto:** por qué se creó, qué problema resuelve
2. **Stack y por qué se eligió cada tecnología:**
   - React 19 + TypeScript (tipado + componentes)
   - Supabase (Auth + DB integrados, RLS, sin backend propio)
   - Zustand (simple, sin boilerplate)
   - Tailwind 4 (utilidades, design tokens)
   - React Hook Form + Zod (formularios con validación tipo-segura)
3. **Arquitectura y decisiones clave:**
   - RLS para seguridad a nivel DB (cada usuario ve solo sus reparaciones)
   - `ticket_code` generado por trigger en DB con retry
   - `get_repair_by_ticket` con `SECURITY DEFINER` para consulta pública
   - Login único (sin registro público) + recuperación de contraseña
   - Componentes UI custom (sin librerías externas)
4. **Modelo de datos:** tabla `repairs` con sus campos y políticas RLS
5. **Estructura del proyecto** (ya existe, mejorar descripciones)

**Validación**
- El README se ve bien en GitHub (markdown renderizado)
- Alguien que nunca vio el proyecto entiende qué hace, por qué y cómo correrlo
- `git add README.md && git commit -m "docs: add architecture and decision records to README"`
