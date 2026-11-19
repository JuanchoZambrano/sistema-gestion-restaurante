import type { Request, Response } from 'express';
import { obtenerIngredientes } from './ingrediente.module';
import { crearIngrediente } from './ingrediente.module';
import { actualizarIngrediente } from './ingrediente.module';

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

export const createIngrediente = async (
  req: Request,
  res: Response
) => {
  try {
    const ingrediente =
      await crearIngrediente(req.body);

    res.status(201).json(ingrediente);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear ingrediente'
    });
  }
};

export const updateIngrediente = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const ingrediente =
      await actualizarIngrediente(
        id,
        req.body
      );

    res.status(200).json(ingrediente);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar ingrediente'
    });
  }
};