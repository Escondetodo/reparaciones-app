import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import Icon, { type IconName } from "./icon";
import Button from "./button";
import Alert from "./Alert";
import clsx from "clsx";

interface SidebarLink {
  label: string;
  icon: IconName;
  href: string;
  end?: boolean;
  disabled?: boolean;
}

const links: SidebarLink[] = [
  { label: "Inicio", icon: "LayoutGrid", href: "/private/admin", end: true },
  {
    label: "Nueva Reparación",
    icon: "CirclePlus",
    href: "/private/admin/reparacion/nueva",
  },
  {
    label: "Reportes",
    icon: "FileChartColumnIncreasing",
    href: "#",
    disabled: true,
  },
  { label: "Ajustes", icon: "Settings", href: "#", disabled: true },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const logout = useAuthStore((state) => state.logout);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);

  const handleLogout = async () => {
    try {
      await logout();
    } catch { /* error already handled by auth store */ }
  };

  return (
    <aside
      role="navigation"
      aria-label="Menú de administración"
      className={clsx(
        "w-64 border-r border-b border-outline dark:border-background-dark bg-surface dark:bg-background-dark flex-col hidden lg:flex",
        className,
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon name="Hammer" size={24} />
        </div>
        <div>
          <h2 className="text-sm font-bold leading-tight">
            Admin Reparaciones
          </h2>
          <p className="text-xs text-on-surface-variant">
            Técnico Especialista
          </p>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {links.map((link) => {
          if (link.disabled) {
            return (
              <div
                key={link.label}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 dark:text-slate-600 cursor-not-allowed"
              >
                <Icon name={link.icon} size={24} />
                <span className="text-sm font-medium">{link.label}</span>
              </div>
            );
          }

          return (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.end}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-dark text-white"
                    : "text-on-surface-variant dark:text-slate-400 hover:bg-outline-variant/50 dark:hover:bg-slate-800",
                )
              }
            >
              <Icon name={link.icon} size={24} />
              <span className="text-sm font-medium">{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t p-4 border-outline dark:border-slate-800">
        <Button
          size="sm"
          variant="primary"
          fullWidth
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Cerrando..." : "Cerrar Sesión"}
        </Button>
        {error && <Alert description={error} variant="danger" />}
      </div>
    </aside>
  );
};

export default Sidebar;
