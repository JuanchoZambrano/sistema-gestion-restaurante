import type { Request, Response } from 'express';
import { obtenerIngredientes } from './ingrediente.module';

export const getIngredientes = async (
  req: Request,
  res: Response
) => {
  try {
    const ingredientes =
      await obtenerIngredientes();

    res.status(200).json(ingredientes);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener ingredientes'
    });
  }
};