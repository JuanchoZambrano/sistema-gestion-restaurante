import { prisma } from "../services/prisma";

export const getEmpleadosModel = async () => {
  return await prisma.empleado.findMany({
    orderBy: { id: "asc" },
  });
};

export const getEmpleadoByIdModel = async (id: number) => {
  return await prisma.empleado.findUnique({
    where: { id },
  });
};

export const createEmpleadoModel = async (
  nombre: string,
  cargo: string,
  telefono?: string,
) => {
  return await prisma.empleado.create({
    data: {
      nombre,
      cargo,
      telefono,
    },
  });
};

export const updateEmpleadoByIdModel = async (
  id: number,
  data: { nombre: string; cargo: string; telefono: string },
) => {
    return await prisma.empleado.update({
        where: {id},
        data,
        select: {
            nombre: true,
            cargo: true,
            telefono: true
        }
    })
};
