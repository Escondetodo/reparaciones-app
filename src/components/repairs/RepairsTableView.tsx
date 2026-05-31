import type { Repair } from "../../services/repairsApi";
import { formatDate } from "../../utils/helpers";
import CardList from "../ui/cardList";
import Icon from "../ui/icon";
import ListInfo from "../ui/list";
import Text from "../ui/text";

interface DesktopRepairsTableProps {
  repairsPaginated: Repair[];
  loading: boolean;
  filteredRepairs: number;
  handleEditRepairClick: (repair: Repair) => void;
}

const RepairsTableView = ({
  repairsPaginated,
  loading,
  filteredRepairs,
  handleEditRepairClick,
}: DesktopRepairsTableProps) => {
  //TODO: Agregar los estilos de Tailwind
  if (loading) {
    return (
      <div className="flex items-center gap-3 justify-center p-4">
        <Icon name="Loader" size={36} />
        <Text as="h1" fontWeight="bold" size="xl2" color="text-zinc-900">
          Cargando reparaciones...
        </Text>
      </div>
    );
  }

  if (filteredRepairs === 0) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center p-4 m-6">
        <Icon name="SearchX" size={48} />
        <Text as="h1" fontWeight="bold" size="xl2" color="text-zinc-900">
          No se encontraron reparaciones
        </Text>
      </div>
    );
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case "analisis":
        return "text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "proceso":
        return "text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "finalizado":
        return "text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };

  return (
    <>
      {/* Vista Desktop */}
      <div className="hidden lg:block overflow-x-auto px-6">
        <ListInfo
          columns={["ID", "Cliente", "Producto", "Ingreso", "Estado", "Accion"]}
        >
          {repairsPaginated.map((repair) => (
            <ListInfo.ListBody
              key={repair.id}
              onClick={() => handleEditRepairClick(repair)}
            >
              <ListInfo.ListColumn className="text-slate-400">
                {repair.id}
              </ListInfo.ListColumn>
              <ListInfo.ListColumn>{repair.nombreCliente}</ListInfo.ListColumn>
              <ListInfo.ListColumn>{repair.nombreProducto}</ListInfo.ListColumn>
              <ListInfo.ListColumn>
                {formatDate(repair.fechaIngreso)}
              </ListInfo.ListColumn>
              <ListInfo.ListColumn>
                <span className={getStateColor(repair.estado)}>
                  {repair.estado}
                </span>
              </ListInfo.ListColumn>
              <ListInfo.ListColumn>
                <Icon name="ChevronRight" size={24} />
              </ListInfo.ListColumn>
            </ListInfo.ListBody>
          ))}
        </ListInfo>
      </div>

      {/* Vista Mobile */}

      <div className="lg:hidden divide-slate-100 dark:divide-slate-800">
        <div className="p-4 space-y-4">
          {repairsPaginated.map((repair) => (
            <CardList
              className="border-slate-200 dark:border-slate-700"
              onClick={() => handleEditRepairClick(repair)}
            >
              <div className="flex items-center gap-3">
                <div>
                  <Text as="span" fontWeight="bold" size="lg">
                    {repair.nombreCliente} {repair.apellidoCliente}
                  </Text>
                  <Text
                    as="span"
                    fontWeight="semibold"
                    size="md"
                    color="text-zinc-700"
                  >
                    {repair.nombreProducto}
                  </Text>
                  <Text as="span" size="md" color="text-zinc-600">
                    {formatDate(repair.fechaIngreso)}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={getStateColor(repair.estado)}>
                  {repair.estado}
                </span>
                <Icon name="ChevronRight" size={24} />
              </div>
            </CardList>
          ))}
        </div>
      </div>
    </>
  );
};

export default RepairsTableView;
