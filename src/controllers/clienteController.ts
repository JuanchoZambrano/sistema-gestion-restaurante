import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function getClientes(req: Request, res: Response) {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json({ data: clientes });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los usuarios",
      details: error.mesagge,
    });
  }
}

export async function createCliente(req: Request, res: Response) {
  try {
    const { nombre, telefono, correo } = req.body;

    if (!nombre || typeof nombre !== "string") {
        return res.status(404).json({
            ok: false,
            message: "Ingrese un nombre y que sea valido por favor."
        })
    }

    if (!correo) {
        return res.status(404).json({
            ok: false,
            message: "Ingrese un correo del cliente."
        })
    }

    const newCliente = await prisma.cliente.create({
      data: {
        nombre,
        telefono,
        correo,
      },
    });

    res.status(201).json({
        ok: true,
        message: "Usuario agregado con exito.",
        data: newCliente
    })
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los usuarios",
      details: error.mesagge,
    });
  }
}
