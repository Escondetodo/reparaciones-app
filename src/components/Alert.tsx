import clsx from "clsx";
import Icon from "./icon";
import type { IconName } from "./icon";
import Text from "./text";

export type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps {
  description?: string;
  nameIcon?: IconName;
  variant?: AlertVariant;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; text: string }
> = {
  info: {
    container:
      "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20",
    icon: "text-blue-600 dark:text-blue-500",
    text: "text-blue-800 dark:text-blue-300",
  },
  success: {
    container:
      "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20",
    icon: "text-green-600 dark:text-green-500",
    text: "text-green-800 dark:text-green-300",
  },
  warning: {
    container:
      "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/20",
    icon: "text-yellow-600 dark:text-yellow-500",
    text: "text-yellow-800 dark:text-yellow-300",
  },
  danger: {
    container:
      "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20",
    icon: "text-red-600 dark:text-red-500",
    text: "text-red-800 dark:text-red-300",
  },
};

const defaultIcons: Record<AlertVariant, IconName> = {
  info: "CircleAlert",
  success: "CircleCheck",
  warning: "TriangleAlert",
  danger: "CircleX",
};

const Alert = ({
  description,
  nameIcon,
  variant = "info",
  className,
}: AlertProps) => {
  const styles = variantStyles[variant];
  const iconToRender = nameIcon || defaultIcons[variant];

  return (
    <div className={clsx("p-5 border rounded-xl", styles.container, className)}>
      <div className="flex gap-3">
        <div className="shrink-0">
          <Icon name={iconToRender} size={24} className={styles.icon} />
        </div>
        <Text size="sm" className={styles.text} fontWeight="normal" as="span">
          {description}
        </Text>
      </div>
    </div>
  );
};

export default Alert;
