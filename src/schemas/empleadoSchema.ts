import z from "zod";

export const createEmpleadoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener por lo menos tres caracteres"),
  telefono: z
    .string()
    .length(10, "El numero de telefono debe tener 10 caracteres.")
    .optional(),
  cargo: z.string().trim().min(1, "El cargo es obligatorio."),
});

export const updateEmpleadoSchema = createEmpleadoSchema.partial()