import { Request, Response, NextFunction } from 'express';

export const validarProveedorIngrediente = (req: Request, res: Response, next: NextFunction) => {
    const { proveedorId, ingredienteId } = req.body;

    if (!proveedorId || !ingredienteId) {
        return res.status(400).json({ 
            mensaje: 'Los campos "proveedorId" e "ingredienteId" son obligatorios.' 
        });
    }

    next();
};