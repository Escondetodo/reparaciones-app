# Specs — PR 1: Polish + Accesibilidad

## 1. README profesional

### Requerimientos
- [ ] README.md descriptivo con:
  - Nombre del proyecto y logo/badge
  - Descripción de qué hace la app
  - Stack tecnológico (React, TypeScript, Supabase, Tailwind, etc.)
  - Capturas de pantalla (placeholder con rutas)
  - Cómo correr el proyecto localmente
  - Scripts disponibles
  - Variables de entorno necesarias
  - Link a demo (cuando exista)
- [ ] Reemplazar completamente el README actual (template de Vite)

### Criterios de aceptación
- Alguien que vea el repo entiende qué hace el proyecto en 10 segundos
- Puede clonar y correr la app sin preguntar nada

---

## 2. Favicon y título de página

### Requerimientos
- [ ] Reemplazar `public/vite.svg` por un favicon acorde (ícono de herramientas/reparación)
  - Usar emoji 🔧 como SVG inline o descargar un SVG libre
- [ ] Cambiar `<title>` en `index.html` de "proyecto-reservas" a "TechRepair"
- [ ] Cambiar `<html lang="en">` a `lang="es"`
- [ ] Agregar meta description en `index.html`

### Criterios de aceptación
- La pestaña del navegador muestra "TechRepair" con el ícono de herramientas
- Meta tags básicos para SEO

---

## 3. Prettier + formateo de código

### Requerimientos
- [ ] Instalar prettier como devDependency
- [ ] Crear `.prettierrc` con configuración básica (singleQuote, semi, tabWidth)
- [ ] Agregar script `format` en `package.json`
- [ ] Formatear todo el código existente

### Criterios de aceptación
- `npm run format` formatea todo el proyecto
- El código queda consistente

---

## 4. Limpiar archivos muertos

### Requerimientos
- [ ] Eliminar carpeta `src/pages/` (vacía)
- [ ] Eliminar carpeta `src/public/` (vacía)
- [ ] Eliminar `src/routes/PrivateRoutes.tsx` (vacío, no se usa)
- [ ] Eliminar `src/AppHookCoinainer.tsx` (comentado, no se usa)
- [ ] Eliminar o limpiar `src/App.css` si no se usa
- [ ] Limpiar registros vacíos en `server/db.json` (los que tienen `nombreCliente: ""`)
- [ ] Verificar que no haya `console.log` en producción (dejarlos para ahora, los vamos a ver en review)

### Criterios de aceptación
- No quedan archivos sin uso en src/
- db.json solo tiene datos reales

---

## 5. Variables de entorno

### Requerimientos
- [ ] Crear `.env.example` con las variables necesarias:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] Agregar `.env` a `.gitignore` (ya está, verificar)
- [ ] Crear archivo de tipos `src/env.d.ts` para que TS reconozca `import.meta.env.VITE_*`

### Criterios de aceptación
- TypeScript no tira error al usar `import.meta.env.VITE_SUPABASE_URL`
- El `.env.example` sirve como documentación de qué configurar

---

## 6. Accesibilidad

### Requerimientos generales
- [ ] Cada formulario tiene `<label>` asociado a su input via `htmlFor`/`id`
- [ ] Botones tienen texto descriptivo o `aria-label`
- [ ] Iconos decorativos tienen `aria-hidden="true"`
- [ ] Navegación por teclado funciona (Tab ordenado, focus visible)
- [ ] Contraste de color cumple WCAG AA mínimo

### Componentes a revisar

#### customInput (`src/components/customInput/customInput.tsx`)
- [ ] Input tiene `id` y label asociado
- [ ] Mensaje de error vinculado con `aria-describedby`
- [ ] `aria-invalid` cuando hay error

#### button (`src/components/button.tsx`)
- [ ] `aria-label` cuando el botón solo tiene ícono
- [ ] `role="button"` si no es un `<button>` nativo

#### modal (`src/components/modal.tsx`)
- [ ] `role="dialog"` y `aria-modal="true"`
- [ ] Focus trap al abrir
- [ ] Cerrar con Escape
- [ ] `aria-labelledby` apuntando al título

#### icon (`src/components/icon.tsx`)
- [ ] `aria-hidden="true"` en el SVG

#### navbar (`src/components/navbar.tsx`)
- [ ] `role="navigation"` y `aria-label`
- [ ] Enlaces tienen texto descriptivo

#### sidebar (`src/components/sidebar.tsx`)
- [ ] `role="navigation"` y `aria-label`
- [ ] Enlaces con texto visible

#### input (`src/components/input.tsx`)
- [ ] Label asociado
- [ ] `aria-invalid` y mensaje de error

#### textArea (`src/components/textArea.tsx`)
- [ ] Label asociado
- [ ] `aria-invalid` cuando hay error

### Criterios de aceptación
- Lighthouse Accessibility score ≥ 90
- Navegación completa con teclado (sin mouse)
- Screen reader (NVDA/VoiceOver) puede navegar el dashboard

---

## Modo de entrega

- **Vos escribís el código**, tarea por tarea
- **Yo reviso** cada avance antes de pasar a la siguiente tarea
- Trabajamos en una branch `feat/pr1-polish-accessibility`
- Commit por tarea completada (git lo manejamos juntos)
