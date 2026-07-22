import clsx from "clsx";
import { useState } from "react";
import Modal from "./modal";
import Button from "./button";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [showContacto, setShowContacto] = useState(false);

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={clsx("hidden md:flex items-center gap-8", className)}
      >
        <button
          onClick={() => setShowContacto(true)}
          className="text-on-surface dark:text-slate-300 hover:text-primary-dark transition-colors"
        >
          Contacto
        </button>
      </nav>
      {showContacto && (
        <Modal
          icon="Mail"
          title="Contactanos"
          description="Estamos para ayudarte. Escribinos a soporte@techrepair.com o llamanos al (011) 1234-5678."
          onClose={() => setShowContacto(false)}
          actions={
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowContacto(false)}
            >
              Cerrar
            </Button>
          }
        />
      )}
    </>
  );
};

export default Navbar;
