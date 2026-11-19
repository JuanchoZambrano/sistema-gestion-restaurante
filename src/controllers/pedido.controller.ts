import { Request, Response } from "express";
import { PedidoModel } from "../models/pedido.model";

export const obtenerPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await PedidoModel.obtenerTodos();
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener los pedidos", error });
  }
};

export const obtenerPedidoPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const pedido = await PedidoModel.obtenerPorId(id);

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    return res.status(200).json(pedido);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al obtener el pedido", error });
  }
};

export const crearPedido = async (req: Request, res: Response) => {
  try {
    const nuevoPedido = await PedidoModel.crear(req.body);
    return res.status(201).json(nuevoPedido);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al crear el pedido", error });
  }
};

export const actualizarPedido = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const pedidoActualizado = await PedidoModel.actualizar(id, req.body);
    return res.status(200).json(pedidoActualizado);
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al actualizar el pedido", error });
  }
};

export const eliminarPedido = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await PedidoModel.eliminar(id);
    return res.status(200).json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al eliminar el pedido", error });
  }
};