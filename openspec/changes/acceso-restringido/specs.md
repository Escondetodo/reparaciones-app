# Spec: Acceso Restringido

## Capability: `acceso`

### Descripción

Control de acceso al sistema. Determina quién puede registrarse y cómo los usuarios autorizados recuperan su contraseña.

---

## Feature: Registro Público Deshabilitado

### Descripción

Se elimina el acceso público al registro de usuarios. El formulario de registro existe en el código pero no tiene ruta en el router.

### Acceptance Criteria

1. **Dado** que un usuario no autenticado navega a `/registro`
   **Cuando** la ruta no existe en el router
   **Entonces** debe mostrar la página 404 (`RoutesNotFound`) o redirigir al landing

2. **Dado** que un usuario está en el landing
   **Cuando** hace click en "Acceso Administrativo"
   **Entonces** debe navegar a `/login` (no a `/registro`)

3. **Dado** que se inspecciona el código fuente
   **Cuando** se busca el componente `RegisterForm`
   **Entonces** debe existir en `src/components/auth/` (no se elimina)

4. **Dado** que se ejecuta `npx tsc -b`
   **Cuando** se compila TypeScript
   **Entonces** no debe haber errores de compilación

5. **Dado** que se ejecuta `npm run lint`
   **Cuando** se ejecuta ESLint
   **Entonces** no debe haber errores (los 4 warnings preexistentes pueden persistir)

---

## Feature: Recuperación de Contraseña

### Descripción

El usuario técnico puede solicitar un email de restablecimiento de contraseña desde la pantalla de login.

### Acceptance Criteria

1. **Dado** que el usuario está en `/login`
   **Cuando** ve el formulario de inicio de sesión
   **Entonces** debe haber un link o botón con el texto "¿Olvidaste tu contraseña?" debajo del formulario

2. **Dado** que el usuario hace click en "¿Olvidaste tu contraseña?"
   **Cuando** se muestra la vista de recuperación
   **Entonces** debe mostrar un formulario con un campo de email y un botón "Enviar link de recuperación"

3. **Dado** que el usuario ingresa un email válido y envía el formulario
   **Cuando** se llama a `supabase.auth.resetPasswordForEmail()`
   **Entonces** debe mostrar un mensaje de éxito: "Te enviamos un link para restablecer tu contraseña"

4. **Dado** que el usuario ingresa un email inválido o vacío
   **Cuando** se envía el formulario
   **Entonces** debe mostrar un error de validación (usando React Hook Form + Zod)

5. **Dado** que el usuario está en la vista de recuperación
   **Cuando** hace click en "Volver al inicio de sesión"
   **Entonces** debe regresar al formulario de login

6. **Dado** que el usuario recibe el email de Supabase
   **Cuando** hace click en el link de restablecimiento
   **Entonces** Supabase maneja el flujo de cambio de contraseña (comportamiento estándar de Supabase Auth)

### Scenarios (Gherkin)

```gherkin
Scenario: Usuario solicita recuperación de contraseña exitosamente
  Given el usuario está en la pantalla de login
  When hace click en "¿Olvidaste tu contraseña?"
  Then ve el formulario de recuperación con campo email
  When ingresa "tecnico@taller.com" y hace click en "Enviar link de recuperación"
  Then se llama a supabase.auth.resetPasswordForEmail("tecnico@taller.com")
  And ve el mensaje "Te enviamos un link para restablecer tu contraseña"

Scenario: Usuario ingresa email vacío
  Given el usuario está en el formulario de recuperación
  When hace click en "Enviar link de recuperación" sin ingresar email
  Then ve un error de validación "El email es requerido"

Scenario: Usuario vuelve al login desde recuperación
  Given el usuario está en el formulario de recuperación
  When hace click en "Volver al inicio de sesión"
  Then vuelve al formulario de login
```
