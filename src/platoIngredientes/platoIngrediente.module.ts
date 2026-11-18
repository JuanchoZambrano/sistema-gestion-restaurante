import { prisma } from '../services/prisma';

export const obtenerPlatoIngredientes = async () => {
  return await prisma.platoIngrediente.findMany({
    include: {
      plato: true,
      ingrediente: true
    }
  });
};