import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener por lo menos tres caracteres"),
  telefono: z
    .string()
    .length(10, "El numero de telefono debe tener por lo menos 10 caracteres.")
    .optional(),
  correo: z.string().email("Correo electronico invalido."),
});

export const updateClienteSchema = createClienteSchema.partial();