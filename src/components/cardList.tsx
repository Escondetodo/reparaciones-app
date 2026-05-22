import clsx from "clsx";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface cardListProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const cardList = ({ children, className, onClick }: cardListProps) => {
  const baseClass = twMerge(
    clsx(
      "flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border transition-transform",
      onClick && "cursor-pointer active:scale-[0.98] w-full",
      className,
    ),
  );

  if (onClick) {
    return (
      <button type="button" className={baseClass} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <div className={baseClass}>{children}</div>;
};

export default cardList;
