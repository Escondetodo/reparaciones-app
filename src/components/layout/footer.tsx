import clsx from "clsx";
import Text from "../ui/text";

interface FooterProps {
  align?: "left" | "center" | "right";
  className?: string;
  textLabel?: string;
}

const Footer = ({ align, className, textLabel }: FooterProps) => {
  return (
    <footer
      className={clsx(
        "w-full py-10 mt-auto border-t border-slate-200",
        className,
      )}
    >
      <div
        className={clsx(
          "flex space-y-6 px-8",
          { "justify-start": align === "left" },
          { "justify-center": align === "center" },
          { "justify-end": align === "right" },
        )}
      >
        <Text as="span" size="md" fontWeight="semibold" color="text-zinc-500">
          {textLabel}
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
