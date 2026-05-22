import clsx from "clsx";
import type { ReactNode } from "react";
import Icon, { type IconName } from "./icon";
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

    //console.log("currentPage", currentPage);
    console.log("totalPages", totalPages);

    //console.log("rangeIni", rangeIni);
    //console.log("rangeFin", rangeFin);
    //console.log("repairsPaginated", repairsPaginated);

    //page.push(currentPage);
    page.push(1);
    //console.log("page antes del if", page);

    if (rangeIni > 2) {
      page.push("...");
      //console.log("Page rangeIni", page);
    }

    for (let i = rangeIni; i <= rangeFin; i++) {
      //console.log("i", i);
      //console.log("prueba de i > repairsPaginated", i > repairsPaginated);
      if (i > 1 && i < totalPages) page.push(i);
      //console.log("page dentro del for", page);
      //console.log("i dentro del for", i);
    }

    if (rangeFin < totalPages - 1) {
      page.push("...");
      //console.log("Page rangeFin", page);
    }

    page.push(totalPages);

    return page;
  };

  const pages = getPageNUmber();
  console.log("step 1", pages);

  //console.log("currentPage", currentPage);
  //console.log("totalPages", totalPages);

  const partialRepair = Math.min(itemsPerPage * currentPage, repairs);
  // console.log("partialRepair", partialRepair);

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
