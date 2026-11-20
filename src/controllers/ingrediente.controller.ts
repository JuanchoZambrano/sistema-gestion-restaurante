import type { Request, Response } from 'express';
import {
  obtenerIngredientes,
  crearIngrediente,
  actualizarIngrediente,
  eliminarIngrediente
} from '../models/ingrediente.model';

import { prisma } from "../services/prisma";

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

export const deleteIngrediente = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await eliminarIngrediente(id);

    res.status(200).json({
      message: 'Ingrediente eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar ingrediente'
    });
  }
};

export const consultarStockIngredientes = async (_req: Request, res: Response) => {
  try {
    const ingredientes = await prisma.ingrediente.findMany({
      select: {
        id: true,
        nombre: true,
        stock: true,
        stockActual: true,
        unidadMedida: true,
      },
      orderBy: {
        stockActual: "asc",
      },
    });

    const inventario = ingredientes.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      stock: Number(item.stock ?? 0),
      stockActual: Number(item.stockActual ?? item.stock ?? 0),
      unidadMedida: item.unidadMedida,
    }));

    const agotados = inventario.filter((item) => item.stockActual <= 0);
    const stockBajo = inventario.filter(
      (item) => item.stockActual > 0 && item.stockActual <= 5
    );

    return res.status(200).json({
      totalIngredientes: inventario.length,
      resumenAlertas: {
        agotados: agotados.length,
        stockBajo: stockBajo.length,
      },
      inventario,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al consultar el stock de ingredientes",
      error,
    });
  }
};