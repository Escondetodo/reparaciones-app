import Icon, { type IconName } from "./icon";
import { createPortal } from "react-dom";
import Text from "./text";
import Button from "./button";
import { useEffect } from "react";

interface ModalProps {
  icon?: IconName;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  onClose?: () => void;
}

//poner como token la clase glass-overlay
//ver porque si le pongo ? a icon da error

const Modal = ({ icon, title, description, actions, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    // Escuchamos el teclado en todo el documento
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Limpiamos el evento cuando el modal se cierra
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20"
    >
      {/* <!-- Modal Container --> */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[rgba(0,106,97,0.12)_0px_32px_64px_-12px] p-10 flex flex-col items-center text-center relative overflow-hidden">
        {/* <!-- Decorative Background Element --> */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        {/* <!-- Success Icon --> */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <Icon name="X" />
          </button>
        )}
        <div className="inline-flex items-center justify-center p-3 bg-secondary-container rounded-full mb-4">
          {icon && (
            <div className="flex items-center justify-center w-14 h-14 bg-primary-dark rounded-lg shadow-md shadow-black/20 mt-5">
              <Icon name={icon} className="text-white text-4xl" />
            </div>
          )}
        </div>
        {/* <!-- Content --> */}
        <Text
          as="h2"
          id="modal-title"
          size="xl2"
          fontWeight="extrabold"
          align="center"
          className="text-on-surface tracking-tight mb-2"
        >
          {title}
        </Text>
        <Text
          id="modal-description"
          size="sm"
          align="center"
          className="text-on-surface-variant leading-relaxed mb-8 max-w-[280px]"
        >
          {description}
        </Text>
        {/* <!-- Actions --> */}
        <div className="flex flex-col w-full gap-3">{actions}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
