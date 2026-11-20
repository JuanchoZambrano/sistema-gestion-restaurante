import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  correo: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),
  rol: z.enum(["MESERO", "GERENTE"]).optional().default("MESERO"),
});

export const loginSchema = z.object({
  correo: z.string().email("Debe ser un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});