import { prisma } from "../services/prisma";

export class ProveedorIngredienteModel {
    // Listar todas las asociaciones entre proveedores e ingredientes
    static async obtenerTodas() {
        return await prisma.proveedorIngrediente.findMany({
            include: {
                proveedor: true,
                ingrediente: true
            }
        });
    }

    // Asociar un ingrediente a un proveedor
    static async crear(data: { proveedorId: number; ingredienteId: number }) {
        return await prisma.proveedorIngrediente.create({
            data,
            include: {
                proveedor: true,
                ingrediente: true
            }
        });
    }

    // Eliminar una asociación (desvincular ingrediente de un proveedor)
    static async eliminar(id: number) {
        return await prisma.proveedorIngrediente.delete({
            where: { id }
        });
    }
}