# TechRepair

Sistema de gestión de reparaciones técnicas. Aplicación web para administrar órdenes de reparación, clientes y productos en un taller técnico.

## Stack

- **Frontend:** React 19 + TypeScript + Vite 7
- **Estilos:** Tailwind CSS 4 + Lucide React (iconos)
- **Estado:** Zustand 5
- **Formularios:** React Hook Form 7 + Zod 4
- **Ruteo:** React Router DOM 7
- **Backend:** Supabase (Auth + futura DB)

## Requisitos

- Node.js 18+
- pnpm

## Instalación

```bash
git clone https://github.com/Escondetodo/reparaciones-app
cd reparaciones-app
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

El servidor de mock API para datos de reparaciones (json-server) sigue disponible en `server/`:

```bash
pnpm dlx json-server server/db.json --port 3001
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Compila para producción |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm format` | Formatea código con Prettier |

## Estructura del proyecto

```
src/
├── components/
│   ├── auth/        # LoginForm, RegisterForm, RegisterlUser
│   ├── client/      # RepairStatus, componentes de cliente
│   ├── dashboard/   # dashbord, header del dashboard
│   ├── landing/     # inicio, cardTypeUser
│   ├── layout/      # footer
│   ├── repairs/     # CRUD de reparaciones
│   └── ui/          # Button, Text, Input, Modal, Sidebar, Navbar, etc.
├── guard/           # Protección de rutas (PrivateGuard)
├── hooks/           # Custom hooks
├── private/         # Router de rutas privadas
├── services/        # Supabase client, API layer
├── store/           # Estado global (Zustand — auth, repairs)
└── utils/           # Constantes, helpers
```

## Licencia

MIT
