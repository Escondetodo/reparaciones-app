import Text from "../text";
import clsx from "clsx";

interface LabelTextProps {
  title: string;
  value?: string | number;
  className?: string;
}

const LabelText = ({ title, value, className }: LabelTextProps) => {
  return (
    <div className={clsx("flex flex-col items-start", className)}>
      <Text as="span" size="sm" color="text-teal-600" fontWeight="bold">
        {title}
      </Text>
      <Text as="span" size="md" color="text-zinc-600" fontWeight="bold">
        {value}
      </Text>
    </div>
  );
};

export default LabelText;
