import { z } from 'zod';

export const platoSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
  precio: z.number().positive(),
  disponible: z.boolean(),
  categoriaId: z.number().int().positive()
});