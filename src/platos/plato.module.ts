import { prisma } from '../services/prisma';

export const obtenerPlatos = async () => {
  return await prisma.plato.findMany();
};

export const crearPlato = async (data: any) => {
  return await prisma.plato.create({
    data
  });
};

export const actualizarPlato = async (
  id: number,
  data: any
) => {
  return await prisma.plato.update({
    where: {
      id
    },
    data
  });
};

export const eliminarPlato = async (
  id: number
) => {
  return await prisma.plato.delete({
    where: {
      id
    }
  });
};