import z from "zod";

export const createPedidoSchema = z.object({
  clienteId: z.number().int().positive("El clienteId debe ser un entero positivo"),
  empleadoId: z.number().int().positive("El empleadoId debe ser un entero positivo"),
  estado: z.string().trim().min(2).optional(),
  total: z.number().nonnegative("El total no puede ser negativo").optional(),
});

export const updatePedidoSchema = createPedidoSchema.partial();