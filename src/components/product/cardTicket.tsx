import CardInfo from "../cardInfo";

export default function CardTicket() {
  return (
    <CardInfo>
      <CardInfo.Body>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-secondary">
            Intake Date
          </span>
          <span className="px-3 py-1 bg-white dark:bg-[#2a3636] rounded-full text-xs font-bold text-primary border border-primary/30">
            Oct 24, 2023 - 09:42 AM
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-secondary">Ticket ID</span>
          <span className="text-sm font-mono font-bold">#TK-88291-B</span>
        </div>
      </CardInfo.Body>
    </CardInfo>
  );
}
