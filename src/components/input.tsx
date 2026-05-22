import clsx from "clsx";
import Icon, { type IconName } from "./icon";
import Text from "./text";

// arreglar lo de spanIcon y modificar varias cosas para
// que se use en otros lado con classname
// y que se pueda usar en nueva reparacion

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isIcon?: boolean;
  iconPosition?: "left" | "right";
  nameIcon?: IconName;
  label?: string;
  labelPosition?: "inside" | "outside";
  error?: string;
  onIconClick?: () => void;
}

const Input = ({
  className,
  isIcon,
  iconPosition = "right",
  nameIcon,
  onIconClick,
  label,
  name,
  labelPosition = "outside",
  error,
  ...props
}: InputProps) => {
  return (
    <label htmlFor={name} className={clsx("flex flex-col w-full", className)}>
      {label && labelPosition == "outside" && (
        <Text
          as="span"
          className="text-xs uppercase tracking-wider mb-2"
          color="text-teal-600"
          fontWeight="bold"
        >
          {label}
        </Text>
      )}
      <div
        className={clsx(
          "flex items-center justify-start w-full rounded-lg border border-[#d5e2e2] dark:border-[#3a4a4a] h-14 py-2 px-3",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50 placeholder:text-slate-500 transition-all",
          "bg-slate-100 dark:bg-slate-800",
          { "border-red-500 focus-within:ring-red-500/50 ": error },
        )}
      >
        <div className="flex flex-col items-start w-full">
          {label && labelPosition == "inside" && (
            <Text
              as="span"
              className="text-xs uppercase tracking-wider"
              color="text-teal-600"
              fontWeight="bold"
            >
              {label}
            </Text>
          )}
          <div className="inline-flex items-center w-full">
            {isIcon && nameIcon && iconPosition === "left" && (
              <button
                type={"button"}
                className={clsx(onIconClick && "cursor-pointer")}
                onClick={onIconClick}
              >
                <Icon name={nameIcon} size={20} />
              </button>
            )}
            <input
              id={name}
              aria-invalid={!!error}
              aria-describedby={error ? `error-${name}` : undefined}
              name={name}
              className={clsx(
                "w-full bg-transparent outline-none",
                isIcon && iconPosition === "left" && "pl-2",
              )}
              {...props}
            />
            {isIcon && nameIcon && iconPosition === "right" && (
              <button
                type={"button"}
                className={clsx(onIconClick && "cursor-pointer")}
                onClick={onIconClick}
              >
                <Icon name={nameIcon} size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
      {error && (
        <Text
          as="span"
          id={`error-${name}`}
          role="alert"
          size="xs"
          className="mt-1"
          color="text-red-500"
          fontWeight="semibold"
        >
          {error}
        </Text>
      )}
    </label>
  );
};

export default Input;
