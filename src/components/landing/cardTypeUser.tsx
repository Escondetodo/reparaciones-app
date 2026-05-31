import clsx from "clsx";
import Icon, { type IconName } from "../ui/icon";
import CardList from "../ui/cardList";
import Text from "../ui/text";

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
        "flex flex-col transition-all duration-500 rounded-xl overflow-hidden p-8 border border-outline-variant/15 border-secondary-container",
        type === "User" && "bg-secondary-container hover:bg-white",
        type === "Admin" && "bg-on-surface hover:bg-primary-dark",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <div
          className={clsx(
            "w-14 h-14 rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform",
            className,
            type === "User" && "bg-primary-dark",
            type === "Admin" && "bg-secondary-container",
          )}
        >
          <Icon name={nameIcon} className={className} />
        </div>
        <Text
          as="h2"
          size="xl2"
          fontWeight="bold"
          className={clsx("mb-3 tracking-tight", type === "User" && "text-[#3d4947]", type === "Admin" && "text-secondary-container")}
          align="left"
        >
          {title}
        </Text>
        <Text
          as="p"
          size="md"
          className={clsx("mb-8", type === "User" && "text-[#3d4947]", type === "Admin" && "text-secondary-container")}
          align="left"
        >
          {value}
        </Text>
        <div className="flex text-primary font-bold group-hover:translate-x-2 transition-transform">
          <div className="flex items-center gap-2">
            <Text
              as="span"
              fontWeight="bold"
              color={type === "User" ? "text-primary-dark" : "text-accent"}
            >
              {ctaText}
            </Text>
            <Icon
              size={32}
              name={ctaIcon}
              className={clsx(
                type === "User" && "text-primary-dark",
                type === "Admin" && "text-accent",
              )}
            />
          </div>
        </div>
      </div>
    </CardList>
  );
};

export default CardTypeUser;
