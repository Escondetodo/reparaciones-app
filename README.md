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
