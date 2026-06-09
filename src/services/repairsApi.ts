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

type JsonRepair = Record<string, unknown>;

const keysToLower = (obj: JsonRepair): JsonRepair => {
  const result: JsonRepair = {};
  for (const key of Object.keys(obj)) {
    result[key.toLowerCase()] = obj[key];
  }
  return result;
};

// PostgREST devuelve minúsculas; leemos ambas variantes por si acaso
const mapRepair = (item: JsonRepair): Repair => ({
  id: String(item.id ?? ""),
  owner_id: String(item.owner_id ?? ""),
  ticket_code: String(item.ticket_code ?? ""),
  nombreCliente: String(item.nombrecliente ?? item.nombreCliente ?? ""),
  apellidoCliente: String(item.apellidocliente ?? item.apellidoCliente ?? ""),
  telefonoCliente: String(item.telefonocliente ?? item.telefonoCliente ?? ""),
  emailCliente: String(item.emailcliente ?? item.emailCliente ?? ""),
  nombreProducto: String(item.nombreproducto ?? item.nombreProducto ?? ""),
  marcaModelo: String(item.marcamodelo ?? item.marcaModelo ?? ""),
  estado: String(item.estado ?? "") as EstadoRepair,
  problemaReportado: String(item.problemareportado ?? item.problemaReportado ?? ""),
  precioPresupuestado: String(item.preciopresupuestado ?? item.precioPresupuestado ?? "0"),
  observacionesTecnicas: String(item.observacionestecnicas ?? item.observacionesTecnicas ?? ""),
  fechaIngreso: String(item.fechaingreso ?? item.fechaIngreso ?? item.created_at ?? ""),
});

export const getRepairs = async (): Promise<Repair[]> => {
  const { data, error } = await supabase.from("repairs").select("*");
  if (error) throw new Error("Error al obtener reparaciones");
  return (data ?? []).map(mapRepair);
};

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

  return mapRepair(data as Record<string, unknown>);
};

export const getRepairByTicket = async (ticketCode: string): Promise<Repair | null> => {
  const { data, error } = await supabase.rpc('get_repair_by_ticket', { t: ticketCode });
  if (error) throw new Error(`Error al obtener la reparación ${ticketCode}`);
  // PostgREST devuelve {} vacío en vez de null cuando no encuentra
  if (!data || !(data as Record<string, unknown>).id) return null;
  return mapRepair(data as Record<string, unknown>);
}

export const postRepairs = async (
  repair: Omit<Repair, "id" | "ticket_code" | "fechaIngreso">,
): Promise<Repair> => {
  const { data, error } = await supabase
    .from("repairs")
    .insert([keysToLower(repair as unknown as JsonRepair)])
    .select()
    .single();
  if (error) {
    throw new Error(error.message || "Error al crear la reparación");
  }
  if (!data) throw new Error("No se recibieron datos al crear la reparación");

  return mapRepair(data as Record<string, unknown>);
};

export const updateRepair = async (
  id: string,
  repair: Omit<Repair, "id">,
): Promise<Repair> => {
  // owner_id, ticket_code, fechaIngreso son generados por la DB, no se mandan en UPDATE
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { owner_id, ticket_code, fechaIngreso, ...dbRepair } = repair;
  const { data, error } = await supabase
    .from("repairs")
    .update(keysToLower(dbRepair as unknown as JsonRepair))
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message || "Error al actualizar la reparación");
  if (!data) throw new Error("No se recibieron datos al actualizar la reparación");

  return mapRepair(data as Record<string, unknown>);
};

export const deleteRepair = async (id: string) => {
  const { error } = await supabase.from("repairs").delete().eq("id", id);

  if (error) {
    throw new Error("Error al eliminar la reparación");
  }
};
