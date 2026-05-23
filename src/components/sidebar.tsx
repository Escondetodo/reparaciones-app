import clsx from "clsx";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./icon";

interface PaginationProps {
  className?: string;
}

const Pagination = ({ className }: PaginationProps) => {
  return (
    <aside role="navigation" aria-label="Menú de administración" className="desktop-sidebar w-64 border-r border-b border-outline dark:border-background-dark bg-surface dark:bg-background-dark flex-col hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon name="Hammer" size={24} />
        </div>
        <div>
          <h2 className="text-sm font-bold leading-tight">
            Admin Reparaciones
          </h2>
          <p className="text-xs text-on-surface-variant">Técnico Especialista</p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-dark text-white"
          href="#"
        >
          <Icon name="LayoutGrid" size={24} />
          <span className="text-sm font-medium">Inicio</span>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-outline-variant/50 dark:hover:bg-slate-800 transition-colors"
          href="#"
        >
          <Icon name="FileChartColumnIncreasing" size={24} />
          <span className="text-sm font-medium">Pedidos</span>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-outline-variant/50 dark:hover:bg-slate-800 transition-colors"
          href="#"
        >
          <Icon name="FileChartColumnIncreasing" size={24} />
          <span className="text-sm font-medium">Reportes</span>
        </a>
        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-outline-variant/50 dark:hover:bg-slate-800 transition-colors"
          href="#"
        >
          <Icon name="Settings" size={24} />
          <span className="text-sm font-medium">Ajustes</span>
        </a>
      </nav>
      <div className="border-t p-4 border-outline dark:border-slate-800">
          <div className="flex items-center justify-center gap-2 bg-primary-dark p-2 rounded-lg">
          <Icon name="CircleUser" className="text-white" size={24} />

          <span className="text-sm font-semibold hidden sm:inline text-white">
            Cerrar Sesión
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Pagination;
