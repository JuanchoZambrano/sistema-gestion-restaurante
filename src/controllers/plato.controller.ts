import { Request, Response } from 'express';
import {
  obtenerPlatos,
  crearPlato,
  actualizarPlato,
  eliminarPlato
} from '../models/plato.model';

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

export const createPlato = async (
  req: Request,
  res: Response
) => {
  try {
    const plato = await crearPlato(req.body);

    res.status(201).json(plato);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear plato'
    });
  }
};

export const updatePlato = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const plato =
      await actualizarPlato(
        id,
        req.body
      );

    res.status(200).json(plato);
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar plato'
    });
  }
};

export const deletePlato = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await eliminarPlato(id);

    res.status(200).json({
      message: 'Plato eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar plato'
    });
  }
};
