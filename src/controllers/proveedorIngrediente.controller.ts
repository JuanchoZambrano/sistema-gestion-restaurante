import { Request, Response } from 'express';
import { ProveedorIngredienteModel } from '../models/proveedorIngrediente.model';

export const obtenerProveedorIngredientes = async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Proveedores e ingredientes']
    #swagger.summary = 'Consultar proveedores y los ingredientes'
    #swagger.description = 'Obtiene todos los proveedores y sus ingredientes registrados.'
  */
    try {
        const relaciones = await ProveedorIngredienteModel.obtenerTodas();
        return res.status(200).json(relaciones);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener las relaciones proveedor-ingrediente', error });
    }
};

export const crearProveedorIngrediente = async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Proveedores e ingredientes']
    #swagger.summary = 'Crear proveedor y sus ingredientes'
    #swagger.description = 'Crea un proveedor y sus ingredientes.'
  */
    try {
        const { proveedorId, ingredienteId } = req.body;
        const nuevaRelacion = await ProveedorIngredienteModel.crear({
            proveedorId: Number(proveedorId),
            ingredienteId: Number(ingredienteId)
        });
        return res.status(201).json(nuevaRelacion);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al asociar el ingrediente al proveedor', error });
    }
};

export const eliminarProveedorIngrediente = async (req: Request, res: Response) => {
    /*
    #swagger.tags = ['Proveedores e ingredientes']
    #swagger.summary = 'Eliminar un proveedor con sus ingredientes.'
    #swagger.description = 'Ingresa el ID de la asociación para eliminarlo.'
  */
    try {
        const { id } = req.params;
        await ProveedorIngredienteModel.eliminar(Number(id));
        return res.status(200).json({ mensaje: 'Asociación eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al eliminar la asociación', error });
    }
};