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

// ──────────────────────────────────────────────
// Helper: convierte las keys de un objeto a minúsculas
// Postgres guarda "nombreCliente" como "nombrecliente" (sin comillas dobles)
// PostgREST necesita que las keys coincidan EXACTAMENTE con la DB
// keysToLower se usa ANTES de insertar/actualizar
// ──────────────────────────────────────────────
type JsonRepair = Record<string, unknown>;

const keysToLower = (obj: JsonRepair): JsonRepair => {
  const result: JsonRepair = {};
  for (const key of Object.keys(obj)) {
    result[key.toLowerCase()] = obj[key];
  }
  return result;
};

// ──────────────────────────────────────────────
// Helper: mapea una fila de Supabase al formato Repair del frontend
// La DB devuelve keys en minúscula (nombrecliente)
// El frontend espera camelCase (nombreCliente)
// mapRepair intenta leer AMBAS variantes por si acaso
// También convierte precioPresupuestado de numeric a string
// ──────────────────────────────────────────────
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

// Obtener todas las reparaciones del usuario logueado
export const getRepairs = async (): Promise<Repair[]> => {
  const { data, error } = await supabase.from("repairs").select("*");
  if (error) throw new Error("Error al obtener reparaciones");
  return (data ?? []).map(mapRepair); // Convierte cada fila al formato del frontend
};

// Obtener UNA reparación por ID (uuid)
export const getRepairById = async (id: string): Promise<Repair | null> => {
  const { data, error } = await supabase
    .from("repairs")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // maybeSingle devuelve null si no hay match (vs single que tira error)
  if (error) {
    throw new Error(`Error al obtener la reparación ${id}`);
  }

  if(!data) {
    throw new Error(`No se encontró la reparación ${id}`);
  }

  // mapRepair se asegura de que las keys estén en camelCase para el frontend
  return mapRepair(data as Record<string, unknown>);
};

// Crear por ticket para cliente — función pública (security definer en DB)
export const getRepairByTicket = async (ticketCode: string): Promise<Repair | null> => {
  const { data, error } = await supabase.rpc('get_repair_by_ticket', { t: ticketCode });
  if (error) throw new Error(`Error al obtener la reparación ${ticketCode}`);
  // Si PostgREST devuelve objeto vacío {} en vez de null, lo tratamos como "no encontrado"
  if (!data || !(data as Record<string, unknown>).id) return null;
  return mapRepair(data as Record<string, unknown>);
}

// Crear una nueva reparación
// No se envía id (lo genera la DB), ticket_code (lo genera el trigger),
// ni fechaIngreso (la DB setea created_at/fechaIngreso automático)
export const postRepairs = async (
  repair: Omit<Repair, "id" | "ticket_code" | "fechaIngreso">,
): Promise<Repair> => {
  // keysToLower convierte camelCase a minúsculas antes de enviar a PostgREST
  const { data, error } = await supabase
    .from("repairs")
    .insert([keysToLower(repair as unknown as JsonRepair)])
    .select()
    .single();
  if (error) {
    throw new Error(error.message || "Error al crear la reparación");
  }
  if (!data) throw new Error("No se recibieron datos al crear la reparación");

  // mapRepair convierte la respuesta de vuelta a camelCase para el frontend
  return mapRepair(data as Record<string, unknown>);
};

// Actualizar una reparación existente
export const updateRepair = async (
  id: string,
  repair: Omit<Repair, "id">,
): Promise<Repair> => {
  // owner_id, ticket_code, fechaIngreso son campos virtuales del frontend
  // NO existen como columnas editables en la DB.
  // Los separamos con destructuring para NO mandarlos en el UPDATE.
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

// Eliminar una reparación
export const deleteRepair = async (id: string) => {
  const { error } = await supabase.from("repairs").delete().eq("id", id);

  if (error) {
    throw new Error("Error al eliminar la reparación");
  }
};
