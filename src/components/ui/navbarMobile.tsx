import clsx from "clsx";
import Icon, { type IconName } from "./icon";
import { NavLink } from "react-router-dom";

interface NavbarMobileProps {
  className?: string;
}

interface NavLinkItem {
  label: string;
  icon: IconName;
  href: string;
  end?: boolean;
}

const links: NavLinkItem[] = [
  { label: "Inicio",          icon: "LayoutGrid", href: "/private/admin",                  end: true  },
  { label: "Nueva Reparación",icon: "CirclePlus", href: "/private/admin/reparacion/nueva"             },
];

const NavbarMobile = ({ className }: NavbarMobileProps) => {
  return (
    <nav
      className={clsx(
        "md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 z-50",
        className,
      )}
    >
      {links.map((link) => (
        <NavLink
          to={link.href}
          key={link.label}
          className={({ isActive }) =>
            clsx(
              "flex flex-col items-center gap-1",
              isActive
                ? "text-primary font-bold"
                : "text-slate-400 font-medium",
            )
          }
        >
          <Icon name={link.icon} size={24} />
          <span className="text-xs">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavbarMobile;
