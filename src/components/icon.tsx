import {
  ArrowRight,
  ArrowLeft,
  EllipsisVertical,
  LogIn,
  Search,
  User,
  Settings,
  ChartColumnBig,
  ChevronLeft,
  ClipboardClock,
  CircleAlert,
  Hourglass,
  LayoutGrid,
  ChevronRight,
  CircleCheck,
  CirclePlus,
  FileChartColumnIncreasing,
  Hammer,
  CircleUserRound,
  Columns3Cog,
  CircleUser,
  FolderCog,
  Circle,
  CircleX,
  Wrench,
  LockKeyhole,
  Mail,
  Phone,
  MonitorSmartphone,
  TriangleAlert,
  Eye,
  ChevronDown,
  ChevronUp,
  ScanText,
  MessageSquareText,
  Loader,
  SearchX,
  X,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import clsx from "clsx";

const icons = {
  ArrowRight,
  ArrowLeft,
  EllipsisVertical,
  LogIn,
  Search,
  User,
  Settings,
  ChevronLeft,
  CircleAlert,
  ChevronRight,
  Circle,
  CircleX,
  CircleCheck,
  ClipboardClock,
  FileChartColumnIncreasing,
  Hourglass,
  LayoutGrid,
  ChartColumnBig,
  Columns3Cog,
  CirclePlus,
  Hammer,
  CircleUserRound,
  CircleUser,
  FolderCog,
  Wrench,
  LockKeyhole,
  Mail,
  Phone,
  MonitorSmartphone,
  TriangleAlert,
  Eye,
  ChevronDown,
  ChevronUp,
  ScanText,
  MessageSquareText,
  Loader,
  SearchX,
  X,
};

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

const Icon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) return null;

  return <LucideIcon className={clsx(className)} {...props} />;
};

export default Icon;
