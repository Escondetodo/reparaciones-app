import clsx from "clsx";
import type { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
  columns: string[];
}

interface ListBodyProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
}

interface ListColumnProps {
  children: ReactNode;
  className?: string;
}

interface ListHeaderProps {
  columns: string[];
  className?: string;
}

const ListInfo = ({ children, columns }: ListProps) => {
  return (
    <table className="w-full text-left">
      {columns && <ListInfo.ListHeader columns={columns} />}
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {children}
      </tbody>
    </table>
  );
};

const ListHeader = ({ columns, className }: ListHeaderProps) => {
  return (
    <thead className={clsx("bg-slate-50 dark:bg-slate-800/50", className)}>
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-left"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const ListBody = ({ children, onClick }: ListBodyProps) => {
  return (
    <tr
      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer group transition-colors"
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const ListColumn = ({ children, className }: ListColumnProps) => {
  return <td className={clsx("px-6 py-4 text-sm", className)}>{children}</td>;
};

ListInfo.ListHeader = ListHeader;
ListInfo.ListBody = ListBody;
ListInfo.ListColumn = ListColumn;

export default ListInfo;
