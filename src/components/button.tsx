import clsx from "clsx";
import Icon, { type IconName } from "./icon";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;

  // Icono
  icon?: IconName;
  iconPosition?: "left" | "right";

  // Apariencia
  variant?: ButtonVariant;
  size?: ButtonSize;

  // Accesibilidad
  ariaLabel?: string;

  // Estado
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 active:scale-95",
  secondary:
    "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 active:scale-95",
  tertiary:
    "bg-transparent text-teal-600 hover:bg-emerald-500/10 active:scale-95",
  danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-1 text-xs gap-1.5",
  md: "h-10 px-1 text-sm gap-2",
  lg: "h-12 px-1 text-base gap-2.5",
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const Button = ({
  children,
  onClick,
  type = "button",
  icon,
  iconPosition = "left",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  ariaLabel,
  className,
  ...props
}: ButtonProps) => {
  const iconEl = icon ? <Icon name={icon} size={iconSizes[size]} /> : null;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (!children ? icon : undefined)}
      className={clsx(
        // base
        "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        // variante y tamaño
        variantStyles[variant],
        sizeStyles[size],
        // ancho completo
        fullWidth && "w-full",
        // deshabilitado
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        // extra desde afuera
        className,
      )}
      {...props}
    >
      {iconPosition === "left" && iconEl}
      {children}
      {iconPosition === "right" && iconEl}
    </button>
  );
};

export default Button;
