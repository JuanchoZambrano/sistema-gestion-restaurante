import { Request, Response, NextFunction } from "express";
import {
  createPedidoSchema,
  updatePedidoSchema,
} from "../schemas/pedidoSchema";

export const validarCrearPedido = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = createPedidoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      mensaje: "Error de validación al crear el pedido",
      errores: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;
  next();
};

export const validarActualizarPedido = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = updatePedidoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      mensaje: "Error de validación al actualizar el pedido",
      errores: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data;
  next();
};