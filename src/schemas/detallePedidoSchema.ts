import z from "zod";

export const createDetallePedidoSchema = z.object({
  pedidoId: z.number().int().positive("El pedidoId debe ser un entero positivo"),
  platoId: z.number().int().positive("El platoId debe ser un entero positivo"),
  cantidad: z.number().int().positive("La cantidad debe ser mayor a 0"),
  precioUnitario: z.number().positive("El precioUnitario debe ser mayor a 0").optional(),
});

export const updateDetallePedidoSchema = createDetallePedidoSchema.partial();