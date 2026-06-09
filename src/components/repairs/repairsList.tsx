import { useState, useEffect } from "react";
import { userRepairsState } from "../../store/repairs";
import type { Repair } from "../../services/repairsApi";
import { useNavigate } from "react-router-dom";
import Input from "../ui/input";
import CardReport from "./cardReport";
import Pagination from "../ui/pagination";
import Button from "../ui/button";
import Text from "../ui/text";
import RepairsTableView from "./RepairsTableView";

const RepairsList = () => {
  const repairs = userRepairsState((state) => state.repairs);
  const loadRepairs = userRepairsState((state) => state.loadRepairs);
  const loading = userRepairsState((state) => state.loading);
  const setSelectedRepair = userRepairsState(
    (state) => state.setSelectedRepair,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadRepairs();
  }, [loadRepairs]);

  const typeStateRepair: { nameIcon: import("../ui/icon").IconName; title: string; className: string; value: number }[] = [
    {
      nameIcon: "ChartColumnBig",
      title: "Total",
      className: "text-emerald-900",
      value: repairs.length,
    },
    {
      nameIcon: "Hourglass",
      title: "Pendiente",
      className: "text-amber-500",
      value: repairs.filter((r) => r.estado === "analisis").length,
    },
    {
      nameIcon: "ClipboardClock",
      title: "En Proceso",
      className: "text-emerald-700",
      value: repairs.filter((r) => r.estado === "proceso").length,
    },
    {
      nameIcon: "CircleCheck",
      title: "Finalizado",
      className: "text-emerald-500",
      value: repairs.filter((r) => r.estado === "finalizado").length,
    },
  ];

  const filteredRepairs = repairs.filter((repair) => {
    const query = searchQuery.toLowerCase();
    if (searchQuery === "") {
      return repair;
    } else {
      const cliente = (repair.nombreCliente ?? "").toLowerCase();
      const producto = (repair.nombreProducto ?? "").toLowerCase();
      return cliente.includes(query) || producto.includes(query);
    }
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRepairs.length / itemsPerPage);
  const repairsPaginated = filteredRepairs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // preguntar porque no trae nada repair

  const navigateTo = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleEditRepairClick = (repair: Repair) => {
    setSelectedRepair(repair);
    navigateTo(`/private/admin/reparacion/${repair.id}`);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {typeStateRepair.map((type, index) => (
          <CardReport
            key={index}
            value={type.value}
            nameIcon={type.nameIcon}
            title={type.title}
            className={type.className}
          />
        ))}
      </div>
      {/* Data Section */}
      <div className="bg-white dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Text as="h2" fontWeight="bold" size="xl" color="text-zinc-900">
            Lista de Reparaciones
          </Text>
          <Button
            variant="primary"
            onClick={() => navigateTo("reparacion/nueva")}
            size="lg"
          >
            Nueva
          </Button>
        </div>
        <div className="lg:px-6 px-4 py-4 border-b border-slate-100 dark:border-slate-800">
          <Input
            type="text"
            placeholder="Buscar reparación o cliente..."
            onChange={handleSearch}
            nameIcon="Search"
          />
        </div>
        <RepairsTableView
          repairsPaginated={repairsPaginated}
          loading={loading}
          filteredRepairs={filteredRepairs.length}
          handleEditRepairClick={handleEditRepairClick}
        />
        <Pagination
          repairs={filteredRepairs.length}
          itemsPerPage={itemsPerPage}
          repairsPaginated={repairsPaginated.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default RepairsList;