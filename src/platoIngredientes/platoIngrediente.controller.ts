import type { Request, Response } from 'express';
import { obtenerPlatoIngredientes } from './platoIngrediente.module';

export const getPlatoIngredientes = async (
  req: Request,
  res: Response
) => {
  try {
    const datos =
      await obtenerPlatoIngredientes();

    res.status(200).json(datos);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener relaciones plato-ingrediente'
    });
  }
};
