import { prisma } from "../services/prisma";

export const getEmpleadosModel = async () => {
  return await prisma.empleado.findMany({
    where: {status: "ACTIVE"},
    orderBy: { id: "asc" },
  });
};

export const getInactiveEmpleadosModel = async () => {
  return await prisma.empleado.findMany({
    where: {status: "INACTIVE"},
    orderBy: { id: "asc" },
  });
}

export const getEmpleadoByIdModel = async (id: number) => {
  return await prisma.empleado.findUnique({
    where: { id, status: "ACTIVE" },
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
  data: {
    nombre?: string;
    cargo?: string;
    telefono?: string;
  },
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

export const deactivateEmpleadoById = async (id: number) => {
  return await prisma.empleado.update({
    where: {id},
    data: {status: "INACTIVE"}
  })
}