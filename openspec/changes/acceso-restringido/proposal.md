# Proposal: Acceso Restringido

## Intent

Restringir el acceso al panel administrativo de TechRepair eliminando el registro público de usuarios. Solo el técnico (o quienes él autorice) pueden acceder al sistema mediante cuentas creadas manualmente desde Supabase Dashboard. Se agrega recuperación de contraseña para que el técnico pueda restablecer su acceso sin depender del Dashboard.

## Scope

### Incluido

- Eliminar la ruta `/registro` del `AppRouter`
- No borrar `RegisterForm.tsx` ni `RegisterlUser.tsx` — quedan en el código como componentes disponibles para uso futuro dentro del dashboard
- Agregar formulario "Olvidé mi contraseña" en la pantalla de login usando `supabase.auth.resetPasswordForEmail()`
- Los usuarios existentes en Supabase Auth siguen siendo válidos (no se eliminan)

### Fuera de alcance (explícito)

| Item | Por qué se difiere |
|------|-------------------|
| Roles de usuario (admin vs cliente) | No necesario para Opción A. Si se necesita después, se agrega como cambio aparte. |
| Panel de creación de usuarios dentro de la app | Se difiere. Por ahora las cuentas se crean desde Supabase Dashboard. |
| Recordame checkbox | Ya funciona por defecto (Supabase persiste sesión en localStorage). Agregar un toggle sería cambio separado. |
| Registro dentro del dashboard | RegisterForm queda en el código pero no se enruta. Si después se decide agregar, es un cambio de una línea. |

## Approach

### Cambios en routing

- En `AppRouter.tsx`: eliminar `<Route path="/registro" element={<RegisterlUser />} />`
- El componente `RegisterlUser` y `RegisterForm` **no se borran** del código fuente

### Olvidé mi contraseña

- Agregar link "¿Olvidaste tu contraseña?" debajo del formulario de login
- Al hacer click, mostrar un modal o cambiar el formulario a uno de solo email
- Usar `supabase.auth.resetPasswordForEmail(email)` para enviar el mail de recuperación
- Supabase se encarga del template de email (se puede personalizar desde el Dashboard)

### Experiencia resultante

```
Landing (/) → Login (/login) → Panel privado (/private/*)
                     ↓
            ¿Olvidaste tu contraseña?
                     ↓
            Ingresá tu email → Te enviamos un link
```

## Affected Areas

| Area | Impact |
|------|--------|
| `src/AppRouter.tsx` | Eliminar ruta `/registro` |
| `src/components/auth/login.tsx` | Agregar link de "Olvidé mi contraseña" |
| `src/components/auth/` | Componentes de registro intactos (no se borran) |

## Size Estimate

~50-80 líneas cambiadas en total (mayoría es el formulario de forgot password).

## Success Criteria

- [ ] Navegar a `/registro` da 404 (o redirige al landing)
- [ ] El formulario de registro sigue existiendo en el código pero no es accesible públicamente
- [ ] En `/login` hay un link "¿Olvidaste tu contraseña?"
- [ ] Al hacer click, se muestra un formulario para ingresar email
- [ ] Al enviar el email, se dispara `supabase.auth.resetPasswordForEmail()` sin errores
- [ ] El técnico recibe el mail y puede restablecer su contraseña
- [ ] `npx tsc -b` y `npm run lint` pasan sin errores
