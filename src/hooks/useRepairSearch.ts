import { useState } from "react";
import { userRepairsState } from "../store/repairs";
import { formatDate } from "../utils/helpers";
import { getRepairByTicket } from "../services/repairsApi";

export const useRepairSearch = () => {
  const [ticketId, setTicketId] = useState("");

  const loading = userRepairsState((state) => state.loading);;
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

const handleLoadRepairById = async () => {
    if (!ticketId.trim()) return;
    try {
      userRepairsState.setState({ loading: true, error: null });
      const repair = await getRepairByTicket(ticketId);
      userRepairsState.setState({ repairById: repair, loading: false });
    } catch (error) {
      userRepairsState.setState({ error: "No se encontró esa reparación", loading: false });
    }
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
