import clsx from "clsx";
import type { ReactNode } from "react";

const colors = {
  "text-zinc-400": "text-zinc-400",
  "text-zinc-500": "text-zinc-500",
  "text-zinc-600": "text-zinc-600",
  "text-zinc-700": "text-zinc-700",
  "text-zinc-900": "text-zinc-900",
  "text-red-500": "text-red-500",
  "text-teal-600": "text-teal-600",
  "text-primary": "text-primary",
  "text-white": "text-white",
};
export type ColorText = keyof typeof colors;

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  align?: "left" | "center" | "right";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5";
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xl2" | "xl3";
  fontWeight?: "normal" | "semibold" | "bold" | "extrabold";
  color?: ColorText;
  className?: string;
}

const Text = ({
  align = "left",
  as = "p",
  children,
  size = "sm",
  fontWeight = "normal",
  color = "text-zinc-900",
  className,
  ...props
}: TextProps) => {
  const TextComponent = as;
  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    xl2: "text-2xl",
    xl3: "text-3xl",
  };
  const fontWeightStyles = {
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const alignmentStyle = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <TextComponent
      className={clsx(
        sizeStyles[size],
        fontWeightStyles[fontWeight],
        color,
        className,
        alignmentStyle[align],
      )}
      {...props}
    >
      {children}
    </TextComponent>
  );
};

export default Text;
