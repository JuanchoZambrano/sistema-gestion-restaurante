import { Request, Response } from 'express';
import { ProveedorModel } from '../models/proveedor.model';

export const obtenerProveedores = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Proveedores']
    #swagger.summary = 'Consultar proveedores'
    #swagger.description = 'Obtiene todos los proveedores registrados.'
  */
    try {
        const proveedores = await ProveedorModel.obtenerTodos();
        return res.status(200).json(proveedores);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al obtener los proveedores', error });
    }
};

export const crearProveedor = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Proveedores']
    #swagger.summary = 'Crear proveedor'
    #swagger.description = 'Crea un proveedor.'
  */
    try {
        const nuevoProveedor = await ProveedorModel.crear(req.body);
        return res.status(201).json(nuevoProveedor);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al crear el proveedor', error });
    }
};

export const actualizarProveedor = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Proveedores']
    #swagger.summary = 'Actualizar un proveedor'
    #swagger.description = 'Ingresa el ID del proveedor para actualizarlo.'
  */
    try {
        const { id } = req.params;
        const proveedorActualizado = await ProveedorModel.actualizar(Number(id), req.body);
        return res.status(200).json(proveedorActualizado);
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al actualizar el proveedor', error });
    }
};

export const eliminarProveedor = async (req: Request, res: Response) => {
  /*
    #swagger.tags = ['Proveedores']
    #swagger.summary = 'Eliminar un proveedor'
    #swagger.description = 'Ingresa el ID del proveedor para eliminarlo.'
  */
    try {
        const { id } = req.params;
        await ProveedorModel.eliminar(Number(id));
        return res.status(200).json({ mensaje: 'Proveedor eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al eliminar el proveedor', error });
    }
};