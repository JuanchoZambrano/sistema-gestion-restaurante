import { prisma } from '../services/prisma';

export const obtenerPlatos = async () => {
  return await prisma.plato.findMany();
};

export const crearPlato = async (data: any) => {
  return await prisma.plato.create({
    data
  });
};