import { prisma } from '../services/prisma';

export const obtenerPlatos = async () => {
  return await prisma.plato.findMany();
};