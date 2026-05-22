# Design — PR 1: Polish + Accesibilidad

## 1. README profesional

### Archivo: `README.md` (reemplazar completo)

```
# TechRepair 🛠️

Sistema de gestión de reparaciones técnicas. App web para administrar 
órdenes de reparación, clientes y productos en un taller técnico.

## Stack

- React 19 + TypeScript
- Vite 7 + SWC
- Tailwind CSS 4
- Zustand (estado)
- React Hook Form + Zod (formularios)
- React Router v7 (ruteo)
- Lucide React (iconos)
- Supabase (backend + auth) — próximamente

## Cómo empezar

1. Clonar: `git clone ...`
2. Instalar: `npm install`
3. Iniciar mock server: `npx json-server server/db.json --port 3001`
4. Iniciar dev: `npm run dev`

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia Vite dev server |
| `npm run build` | Compila para producción |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
```

---

## 2. Favicon y título de página

### Archivo: `index.html`

Cambios:
- `<html lang="es">`
- `<title>TechRepair — Gestión de Reparaciones</title>`
- `<meta name="description" content="Sistema de gestión de reparaciones técnicas">`
- Favicon: crear `public/favicon.svg` con un SVG inline de 🔧

### Archivo: `public/favicon.svg`

SVG libre de un ícono de llave inglesa (wrench). Lo generamos simple:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00685f" stroke-width="2">
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
</svg>
```

---

## 3. Prettier + formateo

### Archivo nuevo: `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

### `package.json` — agregar script:
```json
"format": "prettier --write \"src/**/*.{ts,tsx,css}\""
```

### Ejecutar:
```bash
npm run format
```

---

## 4. Limpiar archivos muertos

### Operaciones:

| Archivo/Carpeta | Acción |
|----------------|--------|
| `src/pages/` | `git rm -r src/pages` |
| `src/public/` | `git rm -r src/public` |
| `src/routes/PrivateRoutes.tsx` | `git rm src/routes/PrivateRoutes.tsx` |
| `src/AppHookCoinainer.tsx` | `git rm src/AppHookCoinainer.tsx` |
| `src/App.css` | Revisar si tiene estilos usados; si no, `git rm` |
| `server/db.json` | Limpiar registros vacíos (los que tienen `nombreCliente: ""`) |

### db.json — registros a eliminar:
IDs vacíos: `7f0c`, `02a3`, `72ad`, `8960`, `e25a`, `d6ba`, `d56e`, `ca85`, `3a1d`, `0fdf`, `c290`, `9413`, `8eb3`, `f679`, `2ccf`, `44d3`

Son 16 registros con todos los campos vacíos. Dejamos solo los datos reales.

---

## 5. Variables de entorno

### Archivo nuevo: `.env.example`

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Archivo nuevo: `src/env.d.ts`

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### `.gitignore` — ya incluye `.env`, `.env.local`, etc. Verificar.

---

## 6. Tailwind v4 Design Tokens

### Problema actual

El proyecto tiene **dos configuraciones** que compiten:

1. `src/index.css` con `@theme` (formato v4) — **esta es la que funciona**
2. `tailwind.config.js` (formato v3) — **Tailwind v4 ignora este archivo**

Varios tokens del `tailwind.config.js` (textSize, borderRadius, fontFamily.display) no se aplican porque v4 solo lee `@theme`.

### Qué vamos a hacer

Centralizar **todos los tokens de diseño** en `src/index.css` usando `@theme`, basados en los colores que ya usa el código y agregando los que faltan para un sistema completo.

### Token system propuesto

```css
@theme {
  /* === Colores primarios === */
  --color-primary: #2c7777;
  --color-primary-light: #3a9a9a;
  --color-primary-dark: #1e5555;
  --color-primary-10: rgba(44, 119, 119, 0.1);

  /* === Colores secundarios === */
  --color-secondary: #5e8787;
  --color-secondary-container: #e8f0f0;

  /* === Superficies === */
  --color-background: #f8fafa;
  --color-background-light: #fcfcfd;
  --color-background-dark: #212c2c;

  /* === Superficies oscuras (alias) === */
  --color-surface: #ffffff;
  --color-on-surface: #1a1a1a;
  --color-on-surface-variant: #6b7280;

  /* === Semánticos === */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* === Bordes === */
  --color-outline: #d1d5db;
  --color-outline-variant: #e5e7eb;

  /* === Tipografía === */
  --font-display: "Manrope", sans-serif;
  --font-body: "Inter", sans-serif;

  /* === Sombras (vía box-shadow) === */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Cambios a hacer

1. Reemplazar `@theme` en `src/index.css` con el bloque completo de arriba
2. Verificar que todos los tokens nuevos funcionen (`bg-primary`, `text-primary`, `bg-background-dark`, etc.)
3. Eliminar `tailwind.config.js` (ya no se usa en v4)
4. Buscar en el código si hay clases con valores hardcodeados (`bg-[#00685f]`, `text-[#121c2a]`) y reemplazarlos por tokens

### Archivos a tocar

| Archivo | Acción |
|---------|--------|
| `src/index.css` | Reemplazar `@theme` con el sistema completo de tokens |
| `tailwind.config.js` | Eliminar (obsoleto en v4) |
| `src/components/inicio/inicio.tsx` | Reemplazar `bg-[#00685f]` → `bg-primary-dark`, `text-[#121c2a]` → `text-on-surface` |
| `src/components/inicio/login.tsx` | Ídem `bg-[#00685f]` |
| `src/components/product/detailRepair.tsx` | Reemplazar hardcodeados si existen |
| Otros componentes con `bg-[...]` o `text-[...]` | Reemplazar con tokens |

### Por qué aprender esto es clave para conseguir laburo

Los **design tokens** es exactamente lo que usan empresas grandes (MercadoLibre, Auth0, GitHub) para mantener consistencia visual. En una entrevista, decir "centralicé los tokens de diseño en el theme de Tailwind" muestra que pensás en **escala**, no solo en maquetar.

---

## 7. Accesibilidad

### Enfoque por componente

#### `icon.tsx`
```tsx
// Cambiar:
<svg ...>  →  <svg aria-hidden="true" ...>
```
Los iconos son decorativos, no informativos. Nunca deben ser leídos por screen readers.

#### `button.tsx`
Interfaz `ButtonProps`:
- Si solo tiene ícono y sin texto visible, requerir `aria-label`
- Si tiene texto visible, no necesita `aria-label`

```tsx
// Si solo ícono:
<button aria-label={ariaLabel} ...>

// Si tiene texto:
<button ...>
  {children}
</button>
```

#### `customInput.tsx`
Estructura actual está en `src/components/customInput/customInput.tsx`. Hay que leerlo primero para ver cómo está armado. Patrón general:

```tsx
<div>
  <label htmlFor={name}>{label}</label>
  <input
    id={name}
    aria-invalid={!!error}
    aria-describedby={error ? `${name}-error` : undefined}
  />
  {error && <p id={`${name}-error`} role="alert">{error.message}</p>}
</div>
```

#### `input.tsx` (componente input simple)
Mismo patrón que customInput.

#### `textArea.tsx`
Mismo patrón con `aria-invalid` y `aria-describedby`.

#### `modal.tsx`
Leer primero cómo está implementado. Patrón general:

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">...</h2>
  {/* Focus trap + Escape key */}
</div>
```

#### `navbar.tsx`
```tsx
<nav role="navigation" aria-label="Navegación principal">
```

#### `sidebar.tsx`
```tsx
<aside role="navigation" aria-label="Menú de administración">
```

### Checklist de verificación

- [ ] Tab navigates through all interactive elements in order
- [ ] Focus ring visible on all elements (:focus-visible)
- [ ] Escape cierra modales
- [ ] Screen reader anuncia errores de formulario
- [ ] Contraste de color: mínimo 4.5:1 para texto normal

---

## Orden de implementación sugerido

Hacemos las tareas en este orden para minimizar conflictos:

1. **Prettier** — formatea todo de una, evita conflictos después
2. **Tailwind tokens** — actualizar `@theme` + eliminar `tailwind.config.js`. Después de esto, los tokens nuevos ya están disponibles
3. **Limpiar archivos muertos** — borrar carpetas vacías, registros vacíos en db.json
4. **Favicon + index.html** — lang, title, meta, favicon
5. **Variables de entorno** — `.env.example` + `src/env.d.ts`
6. **README** — profesional
7. **Accesibilidad** — componente por componente
8. **Commit final y PR**
