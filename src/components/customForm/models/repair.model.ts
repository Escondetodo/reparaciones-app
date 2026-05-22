import { z } from "zod";

export const repairSchema = z.object({
  nombreCliente: z.string().min(1, "El nombre es obligatorio"),
  apellidoCliente: z.string().min(1, "El apellido es obligatorio"),
  telefonoCliente: z
    .string()
    .min(6, "El telefono debe tener al menos 6 caracteres"),
  emailCliente: z.email("Correo electrónico es invalido"),
  nombreProducto: z.string().min(1, "El nombre es obligatorio"),
  marcaModelo: z.string().min(1, "El modelo es obligatorio"),
  estado: z.enum(["analisis", "proceso", "finalizado"]),
  problemaReportado: z.string().min(1, "El problema es obligatorio"),
  precioPresupuestado: z.string().min(1, "El precio es obligatorio"),
  observacionesTecnicas: z
    .string()
    .min(1, "Las observaciones son obligatorias"),
});

export type RepairFormValues = z.infer<typeof repairSchema>;
