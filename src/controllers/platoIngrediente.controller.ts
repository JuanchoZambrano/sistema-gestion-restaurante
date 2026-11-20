import type { Request, Response } from 'express';
import {
  obtenerPlatoIngredientes,
  crearPlatoIngrediente
} from '../models/platoIngrediente.model';

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

export const createPlatoIngrediente = async (
  req: Request,
  res: Response
) => {
  try {
    const relacion =
      await crearPlatoIngrediente(req.body);

    res.status(201).json(relacion);
  } catch (error) {
    res.status(500).json({
      message:
        'Error al crear relación plato-ingrediente'
    });
  }
};
