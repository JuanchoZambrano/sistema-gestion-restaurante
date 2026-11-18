import { prisma } from '../services/prisma';

export const obtenerIngredientes = async () => {
  return await prisma.ingrediente.findMany();
};