import { Request, Response, NextFunction } from 'express';

export const validarProveedor = (req: Request, res: Response, next: NextFunction) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ 
            mensaje: 'El campo "nombre" es obligatorio para el proveedor.' 
        });
    }

    next();
};