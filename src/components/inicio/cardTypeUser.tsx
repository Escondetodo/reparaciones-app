import clsx from "clsx";
import type { ReactNode } from "react";
import Icon, { type IconName } from "../icon";
import { useNavigate } from "react-router-dom";
import CardList from "../cardList";

interface CardTypeUserProps {
  nameIcon: IconName;
  title: string;
  value: string;
  className?: string;
  ctaText?: string;
  ctaIcon: IconName;
  onClick?: () => void;
  type: "User" | "Admin";
}

const CardTypeUser = ({
  nameIcon,
  title,
  value,
  className,
  ctaText,
  ctaIcon,
  type,
  onClick,
}: CardTypeUserProps) => {
  return (
    <CardList
      className={clsx(
        "flex flex-col transition-all duration-500 rounded-xl overflow-hidden p-8 border border-outline-variant/15 border-[#eff4ff]",
        type === "User" && "bg-[#eff4ff] hover:bg-white",
        type === "Admin" && "bg-[#121c2a] hover:bg-[#00685f]",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <div
          className={clsx(
            "w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform",
            className,
            type === "User" && "bg-[#00685f]",
            type === "Admin" && "bg-[#eff4ff]",
          )}
        >
          <Icon name={nameIcon} className={className} />
        </div>
        <h2
          className={clsx(
            "text-2xl font-bold mb-3 tracking-tight text-left",
            type === "User" && "text-[#3d4947]",
            type === "Admin" && "text-[#eff4ff]",
          )}
        >
          {title}
        </h2>
        <p
          className={clsx(
            "mb-8 text-left",
            type === "User" && "text-[#3d4947]",
            type === "Admin" && "text-[#eff4ff]",
          )}
        >
          {value}
        </p>
        <div className="flex text-primary font-bold group-hover:translate-x-2 transition-transform">
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                type === "User" && "text-[#00685f]",
                type === "Admin" && "text-[#89f5e7]",
              )}
            >
              {ctaText}
            </span>
            <Icon
              size={32}
              name={ctaIcon}
              className={clsx(
                type === "User" && "text-[#00685f]",
                type === "Admin" && "text-[#89f5e7]",
              )}
            />
          </div>
        </div>
      </div>
    </CardList>
  );
};

export default CardTypeUser;
