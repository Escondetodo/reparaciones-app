import type { IconName } from "../components/icon";

export const stateOptions = [
  { value: "analisis", label: "Análisis" },
  { value: "proceso", label: "En Proceso" },
  { value: "finalizado", label: "Finalizado" },
];

export const routes: Array<{
  path: string;
  title: string;
  icon: IconName;
  hasButtonClick: boolean;
}> = [
  {
    path: "/private/admin/reparacion/editar",
    title: "Editar reparación",
    icon: "ArrowLeft",
    hasButtonClick: true,
  },
  {
    path: "/private/admin/reparacion",
    title: "Detalle de reparación",
    icon: "ArrowLeft",
    hasButtonClick: true,
  },
  {
    path: "/",
    title: "Panel de Administración",
    icon: "FolderCog",
    hasButtonClick: false,
  },
];
