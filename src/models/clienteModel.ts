import { prisma } from "../services/prisma";

export const getClientesModel = async () => {
  return await prisma.cliente.findMany({
    orderBy: { id: "asc" },
  });
};

export const createClienteModel = async (
  nombre: string,
  correo: string,
  telefono?: string,
) => {
  return await prisma.cliente.create({
    data: {
      nombre,
      correo,
      telefono,
    },
  });
};

export const getClienteByIdModel = async (id: number) => {
  return await prisma.cliente.findUnique({
    where: { id },
  });
};

export const updateClienteModel = async (
  id: number,
  data: { nombre: string; correo: string; telefono?: string },
) => {
  return await prisma.cliente.update({
    where: { id },
    data,
    select: {
      nombre: true,
      telefono: true,
      correo: true,
    },
  });
};
