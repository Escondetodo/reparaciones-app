// ============================================
// API SERVICE - Comunicación con Supabase
// ============================================

import { supabase } from "./supabase"

export type EstadoRepair = "analisis" | "proceso" | "finalizado";

export interface Repair {
  id: string;
  owner_id: string;
  ticket_code: string;
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  emailCliente: string;
  nombreProducto: string;
  marcaModelo: string;
  fechaIngreso: string;
  estado: EstadoRepair;
  problemaReportado: string;
  precioPresupuestado: string;
  observacionesTecnicas: string;
}

// Obtener todas las reparaciones del usuario logueado
export const getRepairs = async (): Promise<Repair[]> => {
  const { data, error } = await supabase.from("repairs").select("*");
  if (error) throw new Error("Error al obtener reparaciones");
  const updated = data?.map((item) => {
    return { ...item, precioPresupuestado: String(item.precioPresupuestado) };
  });
  
  return updated as Repair[];
};

// Obtener UNA reparación por ID (uuid)
export const getRepairById = async (id: string): Promise<Repair | null> => {
  const { data, error } = await supabase
    .from("repairs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw new Error(`Error al obtener la reparación ${id}`);
  }

  if(!data) {
    throw new Error(`No se encontró la reparación ${id}`);
  }
  //data.precioPresupuestado = String(data.precioPresupuestado);
  if (data) {
    return { ...data, precioPresupuestado: String(data.precioPresupuestado) };
  }

  return data as Repair;
};

//Crear por ticket para cliente
export const getRepairByTicket = async (ticketCode: string): Promise<Repair | null> => {
  const { data, error } = await supabase.rpc('get_repair_by_ticket', { t: ticketCode });
  if (error) throw new Error(`Error al obtener la reparación ${ticketCode}`);
  if(!data) return null;
  return { ...data, precioPresupuestado: String(data.precioPresupuestado) };
}

// Crear una nueva reparación
export const postRepairs = async (
  repair: Omit<Repair, "id" | "ticket_code" | "fechaIngreso">,
): Promise<Repair> => {
  const { data, error } = await supabase
    .from("repairs")
    .insert([repair])
    .select()
    .single();
  if (error) {
    throw new Error("Error al crear la reparación");
  }
  if (data) {
    return { ...data, precioPresupuestado: String(data.precioPresupuestado) };
  }

  return data as Repair;
};

// Actualizar una reparación existente
export const updateRepair = async (
  id: string,
  repair: Omit<Repair, "id">,
): Promise<Repair> => {
  const { data, error } = await supabase
    .from("repairs")
    .update(repair)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Error al actualizar la reparación");

  if (data) {
    return { ...data, precioPresupuestado: String(data.precioPresupuestado) };
  }

  return data as Repair;
};

// Eliminar una reparación
export const deleteRepair = async (id: string) => {
  const { error } = await supabase.from("repairs").delete().eq("id", id);

  if (error) {
    throw new Error("Error al eliminar la reparación");
  }
};
