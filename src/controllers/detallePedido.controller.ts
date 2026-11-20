import { Request, Response } from "express";
import { prisma } from "../services/prisma";
import { DetallePedidoModel } from "../models/detallePedido.model";

// Función auxiliar para mantener actualizado el campo 'total' de la tabla pedidos
async function recalcularTotalPedido(pedidoId: number) {
  const detalles = await prisma.detallePedido.findMany({
    where: { pedidoId },
  });

  const total = detalles.reduce<number>(
    (acc: number, item: { cantidad: number; precioUnitario: unknown }) =>
      acc + item.cantidad * Number(item.precioUnitario),
    0
  );

  await prisma.pedido.update({
    where: { id: pedidoId },
    data: { total },
  });
}

export const obtenerDetallePedidos = async (req: Request, res: Response) => {
  try {
    const detalles = await DetallePedidoModel.obtenerTodos();
    return res.status(200).json(detalles);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener los detalles de pedido", error });
  }
};

export const obtenerDetallePedidoPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const detalle = await DetallePedidoModel.obtenerPorId(id);

    if (!detalle) {
      return res.status(404).json({ mensaje: "Detalle de pedido no encontrado" });
    }

    return res.status(200).json(detalle);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener el detalle de pedido", error });
  }
};

export const crearDetallePedido = async (req: Request, res: Response) => {
  try {
    const { pedidoId, platoId, cantidad, precioUnitario } = req.body;

    // Si no envían precioUnitario, lo tomamos automáticamente del precio actual del plato
    let precioFinal = precioUnitario;
    if (precioFinal === undefined) {
      const plato = await prisma.plato.findUnique({ where: { id: platoId } });
      if (!plato) {
        return res.status(404).json({ mensaje: "Plato no encontrado" });
      }
      precioFinal = Number(plato.precio);
    }

    const nuevoDetalle = await DetallePedidoModel.crear({
      pedidoId,
      platoId,
      cantidad,
      precioUnitario: precioFinal,
    });

    await recalcularTotalPedido(pedidoId);

    return res.status(201).json(nuevoDetalle);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear el detalle de pedido", error });
  }
};

export const actualizarDetallePedido = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const detalleActualizado = await DetallePedidoModel.actualizar(id, req.body);

    await recalcularTotalPedido(detalleActualizado.pedidoId);

    return res.status(200).json(detalleActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al actualizar el detalle de pedido", error });
  }
};

export const eliminarDetallePedido = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const detalle = await DetallePedidoModel.obtenerPorId(id);

    if (!detalle) {
      return res.status(404).json({ mensaje: "Detalle de pedido no encontrado" });
    }

    await DetallePedidoModel.eliminar(id);
    await recalcularTotalPedido(detalle.pedidoId);

    return res.status(200).json({ mensaje: "Detalle de pedido eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al eliminar el detalle de pedido", error });
  }
};