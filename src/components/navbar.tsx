import clsx from "clsx";
import { Link } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const links: { label: string; href: string }[] = [
  { label: "Servicios", href: "#" },
  { label: "Contacto", href: "#" },
  { label: "Soporte", href: "#" },
];

const Navbar = ({ className }: NavbarProps) => {
  return (
    <nav className={clsx("hidden md:flex items-center gap-8", className)}>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="text-[#121c2a] dark:text-slate-300 hover:text-[#006a61] transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <Link
        to="/registro"
        className="bg-primary text-white px-6 py-2 rounded-lg font-bold active:scale-95 transition-transform"
      >
        Registrarse
      </Link>
    </nav>
  );
};

export default Navbar;
