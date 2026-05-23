import clsx from "clsx";
import Icon, { type IconName } from "./icon";
import Text from "./text";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isIcon: boolean;
  nameIcon?: IconName;
  title?: string;
  error?: string;
}

const TextArea = ({
  isIcon,
  nameIcon,
  title,
  name,
  error,
  ...props
}: TextAreaProps) => {
  return (
    <label htmlFor={name} className="block">
      <div className="flex items-center gap-2 mb-2">
        {isIcon && nameIcon && (
          <Icon name={nameIcon} size={24} className="text-primary-dark" />
        )}
        <Text as="span" size="xs" fontWeight="semibold" color="text-teal-600">
          {title}
        </Text>
      </div>
      <textarea
        id={name}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
        name={name}
        className={clsx(
          "w-full rounded-lg border-outline-variant dark:border-[#3a4a4a] bg-slate-100 px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none",
          {
            "border-error-600 focus:border-error-600 focus:ring-error-600":
              error,
          },
        )}
        {...props}
      />
      {error && (
        <Text
          id={`error-${name}`}
          as="span"
          role="alert"
          size="xs"
          color="text-red-500"
          fontWeight="semibold"
          className="mt-1"
        >
          {error}
        </Text>
      )}
    </label>
  );
};

export default TextArea;
