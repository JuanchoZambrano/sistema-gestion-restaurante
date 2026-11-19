import { prisma } from "../services/prisma";

export class DetallePedidoModel {
  static async obtenerTodos() {
    return await prisma.detallePedido.findMany({
      include: {
        pedido: true,
        plato: true,
      },
    });
  }

  static async obtenerPorId(id: number) {
    return await prisma.detallePedido.findUnique({
      where: { id },
      include: {
        pedido: true,
        plato: true,
      },
    });
  }

  static async crear(data: {
    pedidoId: number;
    platoId: number;
    cantidad: number;
    precioUnitario: number;
  }) {
    return await prisma.detallePedido.create({
      data,
      include: {
        pedido: true,
        plato: true,
      },
    });
  }

  static async actualizar(
    id: number,
    data: {
      pedidoId?: number;
      platoId?: number;
      cantidad?: number;
      precioUnitario?: number;
    }
  ) {
    return await prisma.detallePedido.update({
      where: { id },
      data,
    });
  }

  static async eliminar(id: number) {
    return await prisma.detallePedido.delete({
      where: { id },
    });
  }
}