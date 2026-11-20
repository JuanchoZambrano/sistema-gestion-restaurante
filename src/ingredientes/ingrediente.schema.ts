import { z } from 'zod';

export const ingredienteSchema = z.object({
  nombre: z.string().min(1),
  stock: z.number().positive(),
  unidadMedida: z.string().min(1)
});