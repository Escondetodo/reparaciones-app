import { useState } from "react";
import { userRepairsState } from "../store/repairs";
import { formatDate } from "../utils/helpers";

export const useRepairSearch = () => {
  const [ticketId, setTicketId] = useState("");

  const loading = userRepairsState((state) => state.loading);
  const loadRepairById = userRepairsState((state) => state.loadRepairById);
  const repairById = userRepairsState((state) => state.repairById);
  const clearRepairById = userRepairsState((state) => state.clearRepairById);
  const error = userRepairsState((state) => state.error);

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("es-ES", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  // };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value);
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(number);
  };

  const handleOnChangeRepair = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value.trim()) {
      clearRepairById();
    }
    setTicketId(value);
  };

  const handleLoadRepairById = () => {
    if (!ticketId.trim()) return;
    loadRepairById(ticketId);
  };

  return {
    ticketId,
    loading,
    repairById,
    error,
    formatDate,
    formatCurrency,
    handleOnChangeRepair,
    handleLoadRepairById,
  };
};
