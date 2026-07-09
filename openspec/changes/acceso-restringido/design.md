# Design: Acceso Restringido

## Arquitectura

El cambio es puramente de frontend. No toca base de datos, ni RLS, ni schemas de Supabase. 

### Flujo de Recuperación de Contraseña

```
[Login] → click "Olvidaste tu contraseña?" → [ForgotPassword view]
                                                  ↓
                                          Ingresar email
                                                  ↓
                                    supabase.auth.resetPasswordForEmail()
                                                  ↓
                                        Mensaje de éxito toast
                                                  ↓
                                        Link → Volver al login
```

Supabase Auth maneja el resto del flujo:
1. Envía email con link mágico
2. Usuario hace click → página de cambio de contraseña de Supabase
3. Usuario cambia contraseña → redirige a la app con sesión iniciada

### Decisión técnica: ¿Modal o vista separada?

**Opción A (toggle en el mismo componente):** Mostrar el formulario de recuperación en el mismo componente `login.tsx` con un estado `mode: "login" | "forgot"`. Simple, sin crear archivos nuevos.

**Opción B (nuevo componente/ruta):** Crear `/forgot-password` como ruta separada.

**Decisión: Opción A.** Es más simple, evita crear una ruta nueva, y el formulario de recuperación es de un solo campo. No justifica una ruta/página aparte.

### Componentes

| Componente | Archivo | Cambio |
|------------|---------|--------|
| `AppRouter` | `src/AppRouter.tsx` | Eliminar línea `<Route path="/registro">` |
| `Login` | `src/components/auth/login.tsx` | Agregar estado `mode` (login/forgot), link "Olvidaste", formulario de recuperación |

### Dependencias

- `supabase.auth.resetPasswordForEmail()` — ya disponible, no requiere instalación
- React Hook Form + Zod — ya están en el proyecto, se reusan para el formulario de recuperación
