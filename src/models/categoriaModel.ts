import { prisma } from "../services/prisma";

export const getCategoriasModel = async () => {
  return await prisma.categoria.findMany({
    orderBy: { id: "asc" },
  });
};

export const getCategoriaByIdModel = async (id: number) => {
  return await prisma.categoria.findUnique({
    where: { id },
  });
};

export const createCategoriaModel = async (
  nombre: string,
  descripcion?: string,
) => {
  return await prisma.categoria.create({
    data: { nombre, descripcion },
    select: {
      nombre: true,
      descripcion: true,
    },
  });
};

export const updateCategoriaByIdModel = async (
  id: number,
  data: { nombre: string; descripcion?: string },
) => {
  return await prisma.categoria.update({
    where: { id },
    data,
    select: {
      nombre: true,
      descripcion: true,
    },
  });
};
