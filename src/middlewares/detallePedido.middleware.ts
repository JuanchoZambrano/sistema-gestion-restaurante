import { Request, Response, NextFunction } from "express";
import {
  createDetallePedidoSchema,
  updateDetallePedidoSchema,
} from "../schemas/detallePedidoSchema";

export const validarCrearDetallePedido = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createDetallePedidoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      mensaje: "Error de validación al crear el detalle del pedido",
      errores: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;
  next();
};

export const validarActualizarDetallePedido = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = updateDetallePedidoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      mensaje: "Error de validación al actualizar el detalle del pedido",
      errores: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;
  next();
};