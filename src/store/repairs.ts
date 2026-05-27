import { create } from "zustand";
import * as api from "../services/repairsApi";
import type { Repair } from "../services/repairsApi";

interface RepairsState {
  repairs: Repair[];
  repairById: Repair | null;
  loading: boolean;
  error: string | null;
  selectedRepair: Repair | null;
  addRepair: (repair: Omit<Repair, "id">) => Promise<void>;
  loadRepairs: () => Promise<void>;
  loadRepairById: (id: string) => Promise<void>;
  deleteRepair: (id: string) => Promise<void>;
  clearRepairById: () => Promise<void>;
  setSelectedRepair: (repair: Repair | null) => void;
  updateRepair: (id: string, repair: Omit<Repair, "id">) => Promise<void>;
}

export const userRepairsState = create<RepairsState>((set) => ({
  clients: [],
  products: [],
  repairById: null,
  repairs: [],
  loading: false,
  error: null,
  selectedRepair: null,

  loadRepairs: async () => {
    set({ loading: true, error: null });
    try {
      const repairs = await api.getRepairs();
      set({ repairs, loading: false });
    } catch (error) {
      set({ error: "Error al cargar las reparaciones", loading: false });
    }
  },

  loadRepairById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const repairById = await api.getRepairById(id);
      set({ repairById, loading: false });
    } catch (error) {
      set({ error: "Error al cargar la reparación", loading: false });
    }
  },

  addRepair: async (repair: Omit<Repair, "id">) => {
    try {
      const newRepair = await api.postRepairs(repair);
      set((state) => ({ repairs: [...state.repairs, newRepair] }));
    } catch (error) {
      set({ error: "Error al agregar la reparación" });
    }
  },

  deleteRepair: async (id: string) => {
    try {
      await api.deleteRepair(id);
      set((state) => ({
        repairs: state.repairs.filter((repair) => repair.id !== id),
      }));
    } catch (error) {
      set({ error: "Error al eliminar la reparación" });
    }
  },

  updateRepair: async (id: string, repair: Omit<Repair, "id">) => {
    try {
      const updatedRepair = await api.updateRepair(id, repair);
      //  console.log("updatedRepair", updatedRepair);
      set((state) => ({
        repairs: state.repairs.map((rps) =>
          rps.id === id ? updatedRepair : rps,
        ),
      }));
    } catch (error) {
      set({ error: "Error al actualizar la reparación" });
      throw error;
    }
  },

  setSelectedRepair: (repair: Repair | null) => {
    set({ selectedRepair: repair });
  },

  clearRepairById: async () => {
    set({ repairById: null });
  },
}));
