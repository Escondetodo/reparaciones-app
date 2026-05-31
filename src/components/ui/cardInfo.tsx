import clsx from "clsx";
import type { ReactNode } from "react";

interface CardInfoProps {
  children: ReactNode;
  className?: string;
}

interface SlotProps {
  children: ReactNode;
}

const CardInfo = ({ className, children }: CardInfoProps) => {
  return (
    <div className="">
      <div
        className={clsx(
          "bg-white dark:bg-[#2a3636] p-6 rounded-xl border border-secondary-container dark:border-[#3a4a4a] shadow-sm",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Header = ({ children }: SlotProps) => (
  <div className="flex items-center gap-2 mb-6 text-primary">{children}</div>
);

const Body = ({ children }: SlotProps) => (
  <div className="grid grid-cols-1 gap-5">{children}</div>
);

const Footer = ({ children }: SlotProps) => (
  <div className="grid grid-cols-1 gap-5">{children}</div>
);

CardInfo.Header = Header;
CardInfo.Body = Body;
CardInfo.Footer = Footer;

export default CardInfo;
