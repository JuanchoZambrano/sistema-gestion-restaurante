import { prisma } from "../services/prisma";

export class PedidoModel {
  static async obtenerTodos() {
    return await prisma.pedido.findMany({
      include: {
        cliente: true,
        empleado: true,
        detalles: {
          include: {
            plato: true,
          },
        },
      },
    });
  }

  static async obtenerPorId(id: number) {
    return await prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        empleado: true,
        detalles: {
          include: {
            plato: true,
          },
        },
      },
    });
  }

  static async crear(data: {
    clienteId: number;
    empleadoId: number;
    estado?: string;
    total?: number;
  }) {
    return await prisma.pedido.create({
      data: {
        ...data,
        total: data.total ?? 0,
      },
    });
  }

  static async actualizar(
    id: number,
    data: {
      clienteId?: number;
      empleadoId?: number;
      estado?: string;
      total?: number;
    }
  ) {
    return await prisma.pedido.update({
      where: { id },
      data,
    });
  }

  static async eliminar(id: number) {
    return await prisma.pedido.delete({
      where: { id },
    });
  }
}