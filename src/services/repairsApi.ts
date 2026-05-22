// ============================================
// API SERVICE - Comunicación con el servidor
// ============================================

const API_URL = "http://localhost:3001";

export type EstadoRepair = "analisis" | "proceso" | "finalizado";

// Definimos la interfaz (ya la tenés en tu código)
export interface Repair {
  id: string;
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

// ============================================
// FUNCIÓN 4: Crear una nueva reparación
// ============================================

export const postRepairs = async (
  repair: Omit<Repair, "id">,
): Promise<Repair> => {
  const response = await fetch(`${API_URL}/repairs`, {
    method: "POST",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(repair),
  });

  if (!response.ok) {
    throw new Error("Error al crear la reparación");
  }

  return response.json();
};

// ============================================
// FUNCIÓN 5: Eliminar una reparación
// ============================================
export const deleteRepair = async (id: string) => {
  const response = await fetch(`${API_URL}/repairs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la reparación");
  }
};

// ============================================
// FUNCIÓN 1: Obtener todas las reparaciones
// ============================================
export const getRepairs = async (): Promise<Repair[]> => {
  const response = await fetch(`${API_URL}/repairs`);

  if (!response.ok) {
    throw new Error("Error al obtener reparaciones");
  }

  return response.json();
};

// ============================================
// FUNCIÓN 5: Actualizar una reparación
// ============================================

export const updateRepair = async (
  id: string,
  repair: Omit<Repair, "id">,
): Promise<Repair> => {
  const response = await fetch(`${API_URL}/repairs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify(repair),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la reparación");
  }

  return response.json();
};

// ============================================
// FUNCIÓN 2: Obtener UNA reparación por ID
// ============================================
export const getRepairById = async (id: string): Promise<Repair> => {
  const response = await fetch(`${API_URL}/repairs/${id}`);

  if (!response.ok) {
    throw new Error(`Error al obtener la reparación ${id}`);
  }

  return response.json();
};

// ============================================
// FUNCIÓN 3: Filtrar por estado
// ============================================
export const getRepairsByStatus = async (estado: string): Promise<Repair[]> => {
  const response = await fetch(`${API_URL}/repairs?estado=${estado}`);

  if (!response.ok) {
    throw new Error("Error al filtrar reparaciones");
  }

  return response.json();
};
