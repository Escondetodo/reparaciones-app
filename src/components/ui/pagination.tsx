import Icon from "./icon";
import Button from "./button";

interface PaginationProps {
  className?: string;
  repairs: number;
  repairsPaginated: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  className,
  repairs,
  repairsPaginated,
  itemsPerPage,
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNUmber = () => {
    const page: (number | string)[] = [];

    if (totalPages <= 1) return [1];

    const rangeIni = currentPage - 1;
    const rangeFin = currentPage + 1;



    //page.push(currentPage);
    page.push(1);

    if (rangeIni > 2) {
      page.push("...");
    }

    for (let i = rangeIni; i <= rangeFin; i++) {
      if (i > 1 && i < totalPages) page.push(i);
    }

    if (rangeFin < totalPages - 1) {
      page.push("...");
    }

    page.push(totalPages);

    return page;
  };

  const pages = getPageNUmber();


  const partialRepair = Math.min(itemsPerPage * currentPage, repairs);

  return (
    <div className="px-6 py-4 bg-slate-100 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <p className="text-xs text-slate-500 font-medium">
        Mostrando {partialRepair} de {repairs} reparaciones
      </p>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="ghost"
          disabled={currentPage <= 1}
          onClick={handlePreviousPage}
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        {pages.map((items) => {
          const isActive = currentPage === items;
          if (items === "...") {
            return <span key={items}>...</span>;
          } else {
            return (
              <Button
                size="sm"
                variant={isActive ? "primary" : "ghost"}
                key={items}
                onClick={() => {
                  if (items === "...") return;
                  handlePageChange(items as number);
                }}
              >
                {items}
              </Button>
            );
          }
        })}
        <Button
          size="sm"
          variant="ghost"
          disabled={currentPage >= totalPages}
          onClick={handleNextPage}
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;