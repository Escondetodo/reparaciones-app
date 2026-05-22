# Tasks — PR 1: Polish + Accesibilidad

## Task 1: Prettier

**Archivos:** `.prettierrc` (nuevo), `package.json` (editar)

### Pasos
1. Crear `.prettierrc` en la raíz del proyecto:

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

2. En `package.json`, agregar en `scripts`:

```json
"format": "prettier --write \"src/**/*.{ts,tsx,css}\""
```

3. Instalar: `npm install -D prettier`
4. Correr: `npm run format`
5. Commit: `git add -A && git commit -m "chore: add prettier and format code"`

### Validación
- `npm run format` no muestra errores
- Los archivos `.tsx` y `.css` tienen formato consistente

---

## Task 2: Tailwind v4 Design Tokens

**Archivos:** `src/index.css` (editar), `tailwind.config.js` (eliminar)

### Paso A: Actualizar `@theme` en `src/index.css`

El bloque actual es:
```css
@theme {
  --color-primary: #2c7777;
  --color-background-light: #fcfcfd;
  --color-background-dark: #212c2c;
  --font-display: "Manrope", sans-serif;
}
```

Reemplazarlo por:

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

  /* === Sombras === */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Paso B: Reemplazar colores hardcodeados

Buscar y reemplazar en los componentes:

| Archivo | Buscar | Reemplazar |
|---------|--------|------------|
| `src/components/inicio/inicio.tsx` | `bg-[#00685f]` | `bg-primary-dark` |
| `src/components/inicio/inicio.tsx` | `text-[#121c2a]` | `text-on-surface` |
| `src/components/inicio/login.tsx` | `bg-[#00685f]` | `bg-primary-dark` |
| `src/components/inicio/RegisterlUser.tsx` | `bg-[#00685f]` | `bg-primary-dark` |
| Otros `bg-[...]` o `text-[...]` con colores que coincidan | — | Reemplazar con token |

Acá te ayudo: **avísame cuando llegues a este paso** y revisamos juntos si hay más hardcodeados.

### Paso C: Eliminar `tailwind.config.js`

```bash
git rm tailwind.config.js
```

### Paso D: Verificar que funcione

```bash
npm run dev
```

La app debe verse igual que antes. Si algún color cambió, avisame y lo corregimos.

### Validación
- `npm run dev` funciona
- `npx tsc -b` no tira errores
- La UI se ve igual que antes
- Commit: `git add -A && git commit -m "feat: add tailwind v4 design tokens"`

---

## Task 3: Limpiar archivos muertos

**Archivos:** `src/pages/`, `src/public/`, `src/routes/PrivateRoutes.tsx`, `src/AppHookCoinainer.tsx`, `server/db.json`

### Pasos
1. Eliminar carpetas vacías:
```bash
git rm -r src/pages src/public
```

2. Eliminar archivos muertos:
```bash
git rm src/routes/PrivateRoutes.tsx src/AppHookCoinainer.tsx
```

3. Verificar si `src/App.css` tiene estilos usados. Leer el archivo y si no tiene nada necesario:
```bash
git rm src/App.css
```

4. Revisar `import "./App.css"` en `App.tsx` — si eliminás App.css, sacar también ese import.

5. En `server/db.json`, eliminar los 16 registros vacíos (los que tienen `"nombreCliente": ""`). IDs: `7f0c`, `02a3`, `72ad`, `8960`, `e25a`, `d6ba`, `ca85`, `3a1d`, `0fdf`, `c290`, `9413`, `8eb3`, `f679`, `2ccf`, `44d3`.

**Tip:** buscá en el JSON todos los objetos donde `"nombreCliente": ""` y borrá esas líneas.

### Validación
- `npm run dev` funciona
- No hay imports rotos
- Commit: `git commit -m "chore: remove dead files and clean db.json"`

---

## Task 4: Favicon + index.html

**Archivos:** `public/favicon.svg` (nuevo), `index.html` (editar)

### Paso A: Crear `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2c7777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
</svg>
```

### Paso B: Editar `index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="TechRepair — Sistema de gestión de reparaciones técnicas" />
    <title>TechRepair — Gestión de Reparaciones</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Validación
- La pestaña del navegador muestra "TechRepair — Gestión de Reparaciones" con el ícono de llave
- Commit: `git commit -m "chore: add favicon and update page title"`

---

## Task 5: Variables de entorno

**Archivos:** `.env.example` (nuevo), `src/env.d.ts` (nuevo)

### Paso A: Crear `.env.example`

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Paso B: Crear `src/env.d.ts`

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

### Validación
- `npx tsc -b` no tira errores
- Si ya tenés Supabase, podés probar que `import.meta.env.VITE_SUPABASE_URL` no sea `undefined`
- Commit: `git commit -m "chore: add env example and type definitions"`

---

## Task 6: README profesional

**Archivos:** `README.md` (reemplazar)

Contenido completo (copiar y pegar):

```markdown
# TechRepair 🛠️

Sistema de gestión de reparaciones técnicas. Aplicación web para administrar órdenes de reparación, clientes y productos en un taller técnico.

## Stack

- **Frontend:** React 19 + TypeScript + Vite 7
- **Estilos:** Tailwind CSS 4 + Lucide React (iconos)
- **Estado:** Zustand 5
- **Formularios:** React Hook Form 7 + Zod 4
- **Ruteo:** React Router DOM 7
- **Backend:** json-server (mock) → próximamente Supabase

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
git clone <repo-url>
cd proyecto-reservas
npm install
```

## Desarrollo

En dos terminales:

```bash
# Terminal 1 — mock API
npx json-server server/db.json --port 3001

# Terminal 2 — frontend
npm run dev
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea código con Prettier |

## Estructura del proyecto

```
src/
├── components/     # Componentes UI
│   ├── customForm/ # Formularios (login, registro, repairs)
│   ├── customInput/# Inputs reutilizables
│   ├── inicio/     # Landing, login, dashboard
│   └── product/    # CRUD de reparaciones
├── guard/          # Protección de rutas (PrivateGuard)
├── hooks/          # Custom hooks
├── private/        # Router de rutas privadas
├── services/       # API layer (repairsApi)
├── store/          # Estado global (Zustand)
└── utils/          # Constantes, helpers
```

## Licencia

MIT
```

### Validación
- Se ve bien en GitHub (formateado con markdown)
- Alguien que vea el repo entiende qué hace y cómo correrlo
- Commit: `git commit -m "docs: add professional README"`

---

## Task 7: Accesibilidad

**Archivos:** varios componentes en `src/components/`

### Componentes a modificar

#### 7a. `icon.tsx` — decorativo
Agregar `aria-hidden="true"` al SVG raíz. Los iconos son decorativos, no deben ser leídos por screen readers.

#### 7b. `button.tsx` — etiquetar botones
Si el botón solo tiene ícono (sin texto visible), necesita `aria-label`. Agregar prop opcional `ariaLabel` en la interfaz.

#### 7c. `customInput.tsx` — formularios accesibles
Leer el archivo primero para ver la estructura actual. Patrón general:
- Label con `htmlFor={name}` → input con `id={name}`
- `aria-invalid={!!error}` cuando hay error
- `aria-describedby` linkeando al mensaje de error

#### 7d. `input.tsx` — igual que customInput
Mismo patrón de accesibilidad.

#### 7e. `textArea.tsx` — igual
Label, aria-invalid, aria-describedby.

#### 7f. `modal.tsx` — diálogo modal
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby`
- Cerrar con tecla Escape
- Focus management (al abrir, focus en el primer elemento)

#### 7g. `navbar.tsx` — navegación
- `role="navigation"` y `aria-label="Navegación principal"`

#### 7h. `sidebar.tsx` — navegación secundaria
- `role="navigation"` y `aria-label="Menú de administración"`

### Validación
- Navegación completa con tecla Tab (orden lógico)
- Focus visible en todos los elementos interactivos
- Modal se cierra con Escape
- `npx tsc -b` no tira errores
- Commit por componente o en lote: `git commit -m "feat: add accessibility to components"`

---

## Final del PR 1

Cuando todas las tasks estén completadas y commiteadas en la branch `feat/pr1-polish-accessibility`:

```bash
git push origin feat/pr1-polish-accessibility
```

Y después creamos el PR juntos.

## Review Workload Forecast

- **Líneas estimadas:** ~350-400
- **Presupuesto:** 400 líneas (D1)
- **Chained PRs:** No, este entra en un solo PR
- **Decisión:** Continuar con PR único
