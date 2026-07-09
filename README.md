# TechRepair

Sistema de gestión de reparaciones técnicas para talleres. Una aplicación web que permite administrar órdenes de reparación, registrar clientes y productos, y hacer seguimiento del estado de cada reparación.

## Contexto del proyecto

TechRepair nace de la necesidad de un taller técnico de contar con una herramienta digital para reemplazar el papel y los archivos sueltos. El objetivo es simple: que un técnico pueda registrar un equipo que entra al taller, actualizar su estado a medida que avanza la reparación, y que el cliente pueda consultar el estado de su equipo mediante un código de ticket, sin necesidad de registrarse ni llamar por teléfono.

El proyecto prioriza la simplicidad: una sola persona (el dueño o encargado del taller) gestiona todo desde un panel privado, y los clientes solo ven la información de su reparación a través de un buscador público por código de ticket.

## Stack

| Tecnología | Por qué |
|---|---|
| **React 19 + TypeScript** | Base moderna de UI con tipado estático. TypeScript atrapa errores en tiempo de compilación y hace que el código sea más predecible y fácil de refactorizar. |
| **Vite 7** | Bundler rápido con HUD instantáneo, reemplaza a Create React App. |
| **Supabase** (Auth + PostgreSQL) | Backend como servicio que integra autenticación y base de datos relacional con Row Level Security (RLS). Elimina la necesidad de mantener un backend propio. |
| **Zustand 5** | Estado global liviano y sin boilerplate. A diferencia de Redux, no requiere providers ni actions verbosas. Las stores son hooks de React directamente. |
| **Tailwind CSS 4** | Framework de utilidades que permite construir UIs consistentes sin salir del HTML. Design tokens y variantes dark mode nativas. |
| **React Hook Form 7 + Zod 4** | Formularios performantes con validación esquematizada. React Hook Form maneja el estado del formulario sin re-renders innecesarios, y Zod define los esquemas de validación con inferencia de tipos automática. |
| **React Router DOM 7** | Ruteo declarativo con soporte para layouts anidados, loaders y guards de autenticación. |
| **Lucide React** | Iconos SVG como componentes React, livianos y personalizables. |

## Arquitectura y decisiones clave

### RLS para seguridad a nivel de base de datos

Cada política de Row Level Security en Supabase filtra por `auth.uid() = owner_id`. Esto significa que un usuario autenticado **solo puede ver, insertar, actualizar y eliminar sus propias reparaciones**. La seguridad se aplica directamente en la base de datos, no solo en el frontend, lo que elimina el riesgo de que un cliente malicioso acceda a datos ajenos manipulando el cliente.

```sql
create policy "repairs_select_own" on public.repairs
  for select to authenticated using (auth.uid() = owner_id);
```

### `ticket_code` generado por trigger con retry

El código de ticket (ej: `ORD-A3F8C912`) se genera automáticamente al insertar una reparación mediante un trigger `before insert`. Si ocurre un `unique_violation` (colisión), reintenta hasta 5 veces antes de fallar. Esto evita tener que generar el código desde la aplicación y garantiza unicidad sin bloqueos.

```sql
create trigger repairs_ticket_code_bi
  before insert on public.repairs
  for each row execute function public.assign_ticket_code();
```

### `get_repair_by_ticket` con `SECURITY DEFINER`

La función `get_repair_by_ticket` está marcada como `SECURITY DEFINER`, lo que permite que **cualquier persona** (incluso no autenticada) consulte el estado de una reparación usando su código de ticket. Esto es lo que habilita el buscador público en la landing page sin exponer el resto de los datos.

### Login único + recuperación de contraseña

El sistema no tiene registro público. El único usuario (el dueño/técnico) se crea manualmente desde el panel de Supabase. Para acceder, ingresa con su email y contraseña. Si la olvida, puede solicitar un link de recuperación que Supabase envía automáticamente. Esto simplifica la seguridad al máximo: no hay gestión de roles, ni múltiples usuarios, ni jerarquías.

### Componentes UI custom

Todos los componentes de UI (Button, Input, Modal, Sidebar, Navbar, etc.) son propios, sin librerías externas como Material UI o Shadcn. Esto mantiene el bundle liviano y da control total sobre el diseño y la consistencia visual.

## Modelo de datos

### Tabla `repairs`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `uuid` (PK) | Identificador único, generado automáticamente |
| `owner_id` | `uuid` (FK → `auth.users`) | Usuario propietario de la reparación |
| `ticket_code` | `text` (unique) | Código público tipo `ORD-A3F8C912` |
| `nombreCliente` | `text` | Nombre del cliente |
| `apellidoCliente` | `text` | Apellido del cliente |
| `telefonoCliente` | `text` | Teléfono de contacto |
| `emailCliente` | `text` | Email del cliente |
| `nombreProducto` | `text` | Tipo de producto (ej: Notebook, Monitor) |
| `marcaModelo` | `text` | Marca y modelo del equipo |
| `estado` | `text` | Estado: `analisis`, `proceso` o `finalizado` |
| `problemaReportado` | `text` | Descripción del problema según el cliente |
| `precioPresupuestado` | `numeric(12,2)` | Presupuesto estimado |
| `observacionesTecnicas` | `text` | Notas internas del técnico |
| `fechaIngreso` | `timestamptz` | Fecha y hora de ingreso (default: `now()`) |

### Políticas RLS

- `SELECT`, `INSERT`, `UPDATE`, `DELETE`: solo el `owner_id` igual al usuario autenticado.
- `get_repair_by_ticket()`: acceso público sin autenticación (solo lectura de la reparación específica por código).

## Estructura del proyecto

```
src/
├── components/
│   ├── auth/           # Login, formulario de login, registro (deshabilitado)
│   ├── client/         # Componentes para la vista de cliente (búsqueda por ticket)
│   ├── dashboard/      # Dashboard principal del técnico
│   ├── landing/        # Landing page pública con buscador de ticket
│   ├── layout/         # Footer y layout general
│   ├── repairs/        # CRUD de reparaciones: lista, detalle, edición, creación
│   └── ui/             # Componentes UI atómicos: Button, Input, Modal, Sidebar, etc.
├── guard/              # Protección de rutas (PrivateGuard, redirección a login)
├── hooks/              # Custom hooks (useRepairSearch)
├── private/            # Router con rutas privadas (requieren autenticación)
├── schemas/            # Esquemas de validación Zod
├── services/           # Cliente de Supabase y API calls
├── store/              # Estado global con Zustand (auth, repairs)
└── utils/              # Constantes, helpers y formateadores
```

### Descripción por carpeta

- **`components/auth/`**: Maneja toda la autenticación. `LoginForm` es el formulario de login con "Olvidé mi contraseña". `RegisterForm` y `RegisterlUser` existen pero están deshabilitados — el registro se hace manualmente desde Supabase.
- **`components/repairs/`**: Corazón de la aplicación. Incluye el formulario de ingreso (`ProductIntaketNew`), el detalle de reparación (`DetailRepair`), la edición (`EditRepairProduct`), y la lista con tabla y vista de estados (`RepairsTableView`, `repairsList`).
- **`components/ui/`**: Biblioteca de componentes reutilizables. Siguen un patrón de diseño atómico: botones, inputs, modales, sidebar, navbar, cards, etc. Sin dependencias externas de UI.
- **`store/`**: Stores de Zustand. `repairsStore` maneja el CRUD completo con llamadas a la API. `authStore` maneja sesión y autenticación.
- **`services/`**: `supabase.ts` inicializa el cliente de Supabase. `repairsApi.ts` contiene las funciones que llaman a las tablas y funciones SQL (incluyendo `getRepairByTicket`).
- **`guard/`**: `PrivateGuard` es un componente wrapper que verifica si hay sesión activa; si no, redirige a `/login`.

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

> **Nota:** json-server está deprecado. Los datos de reparaciones ahora se almacenan en Supabase DB. El archivo `server/db.json` se mantiene como referencia histórica. Si necesitás migrar datos localmente, usá el seed SQL en `supabase/sql/0002_repairs_seed.sql`.

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Compila para producción |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm format` | Formatea código con Prettier |

## Licencia

MIT
