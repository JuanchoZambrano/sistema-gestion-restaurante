import { prisma } from '../config/db';

export class ProveedorModel {
    static async obtenerTodos() {
        return await prisma.proveedor.findMany({
            include: { ingredientes: true }
        });
    }

    static async crear(data: { nombre: string; contacto?: string; telefono?: string; direccion?: string }) {
        return await prisma.proveedor.create({
            data
        });
    }

    static async actualizar(id: number, data: { nombre?: string; contacto?: string; telefono?: string; direccion?: string }) {
        return await prisma.proveedor.update({
            where: { id },
            data
        });
    }

    static async eliminar(id: number) {
        return await prisma.proveedor.delete({
            where: { id }
        });
    }
}