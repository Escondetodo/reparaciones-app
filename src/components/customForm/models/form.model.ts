import { z } from "zod";

export const registerSchema = z
  .object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.email("Correo electrónico es obligatorio"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Correo electrónico es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
