import { prisma } from '../services/prisma';

export const obtenerIngredientes = async () => {
  return await prisma.ingrediente.findMany();
};

export const crearIngrediente = async (data: any) => {
  return await prisma.ingrediente.create({
    data
  });
};

export const actualizarIngrediente = async (
  id: number,
  data: any
) => {
  return await prisma.ingrediente.update({
    where: {
      id
    },
    data
  });
};

export const eliminarIngrediente = async (
  id: number
) => {
  return await prisma.ingrediente.delete({
    where: {
      id
    }
  });
};