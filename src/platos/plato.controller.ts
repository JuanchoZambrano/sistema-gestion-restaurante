import { Request, Response } from 'express';
import { obtenerPlatos } from './plato.module';

export const getPlatos = async (
  req: Request,
  res: Response
) => {
  try {
    const platos = await obtenerPlatos();

    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener platos',
    });
  }
};