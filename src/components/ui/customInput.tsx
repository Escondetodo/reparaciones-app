import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Input from "./input";
import type { IconName } from "./icon";

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type: string;
  isIcon?: boolean;
  iconPosition?: "left" | "right";
  nameIcon?: IconName;
  value?: string | number;
  error?: FieldError;
  onIconClick?: () => void;
  prefix?: string;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  error,
  prefix,
  ...props
}: CustomInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          type={type}
          label={label}
          placeholder={placeholder}
          onChange={field.onChange}
          value={field.value}
          name={field.name}
          error={error?.message}
          prefix={prefix}
          {...props}
        />
      )}
    />
  );
};

export default CustomInput;
