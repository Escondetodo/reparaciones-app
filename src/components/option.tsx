import clsx from "clsx";

interface OptionProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  isStatusBase?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Option = ({
  name,
  value,
  label,
  checked,
  isStatusBase,
  onChange,
}: OptionProps) => {
  return (
    <label
      className={clsx(
        "flex items-center p-3 rounded-lg border border-secondary-container dark:border-[#3a4a4a] shadow-sm transition-all cursor-pointer",
        {
          "border-transparent bg-teal-50 text-teal-700 hover:bg-teal-100":
            isStatusBase,
        },
      )}
    >
      <input
        className="w-4 h-4 text-primary focus:ring-primary border-outline-variant cursor-pointer"
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-3 text-sm font-medium text-on-surface">{label}</span>
    </label>
  );
};

export default Option;
