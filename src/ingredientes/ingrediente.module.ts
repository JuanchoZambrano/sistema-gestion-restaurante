import { prisma } from '../services/prisma';

export const obtenerIngredientes = async () => {
  return await prisma.ingrediente.findMany();
};

export const crearIngrediente = async (data: any) => {
  return await prisma.ingrediente.create({
    data
  });
};

