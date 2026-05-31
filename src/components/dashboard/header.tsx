import { twMerge } from "tailwind-merge";
import Icon from "../ui/icon";
import Button from "../ui/button";
import type { IconName } from "../ui/icon";
import Text, { type ColorText } from "../ui/text";

interface HeaderProps {
  title: string;
  titleColor?: ColorText;
  icon?: IconName;
  className?: string;
  buttonEllipsis?: boolean;
  hasButtonClick?: boolean;
  onClick?: () => void;
  onClickEllipsis?: () => void;
}

const Header = ({
  title,
  icon,
  className,
  titleColor,
  hasButtonClick,
  onClick,
  buttonEllipsis,
  onClickEllipsis,
}: HeaderProps) => {
  return (
    <header
      className={twMerge(
        "h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-4 py-3 flex items-center justify-between sticky top-0 z-20",
        className,
      )}
    >
      <div className="relative flex items-center justify-between w-full mx-auto max-w-7xl">
        <div className="flex gap-2">
          <div className="flex items-center justify-start sm:justify-center">
            {icon && !hasButtonClick && (
              <Icon name={icon} size={32} className="text-primary" />
            )}
            {hasButtonClick && (
              <Button variant="ghost" icon="ArrowLeft" onClick={onClick} />
            )}
          </div>
          <div className="flex items-center justify-start sm:justify-center">
            <Text as="h1" size="xl2" fontWeight="bold" color={titleColor}>
              {title}
            </Text>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          {buttonEllipsis && (
            <Button
              variant="ghost"
              icon="EllipsisVertical"
              onClick={onClickEllipsis}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
