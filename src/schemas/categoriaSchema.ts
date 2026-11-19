import z from "zod";

export const createCategoriaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener por lo menos 3 caracteres."),
  descripcion: z.string().optional(),
});

export const updateCategoriaSchema = createCategoriaSchema.partial();
