import CardList from "../cardList";
import Icon, { type IconName } from "../icon";

interface CardReportProps {
  nameIcon: IconName;
  title: string;
  value: number;
  className?: string;
}

const CardReport = ({ nameIcon, title, value, className }: CardReportProps) => {
  console.log("nameIcon", nameIcon);
  return (
    <CardList className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <Icon name={nameIcon} className={className} />
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-left text-2xl font-extrabold">{value}</h3>
      </div>
    </CardList>
  );
};

export default CardReport;
