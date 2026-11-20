import { z } from 'zod';

export const platoIngredienteSchema = z.object({
  platoId: z.number().int().positive(),
  ingredienteId: z.number().int().positive(),
  cantidad: z.number().positive()
});