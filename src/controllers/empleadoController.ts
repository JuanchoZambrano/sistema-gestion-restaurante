import { Request, Response } from "express";
import { prisma } from "../services/prisma";

export async function getEmpleados(req: Request, res: Response) {
  try {
    const empleados = await prisma.empleado.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json({ data: empleados });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los empleados",
      details: error.mesagge,
    });
  }
}

export async function createEmpleado(req: Request, res: Response) {
  try {
    const { nombre, cargo, telefono } = req.body;

    if (!nombre || typeof nombre !== "string") {
        return res.status(404).json({
            ok: false,
            message: "Ingrese un nombre y que sea valido por favor."
        })
    }

    if (!cargo || typeof cargo !== "string") {
        return res.status(404).json({
            ok: false,
            message: "Ingrese un cargo y que sea valido por favor."
        })
    }

    const newEmpleado = await prisma.empleado.create({
      data: {
        nombre,
        cargo,
        telefono,
      },
    });

    res.status(201).json({
        ok: true,
        message: "Empleado agregado con exito.",
        data: newEmpleado
    })
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los empleados",
      details: error.mesagge,
    });
  }
}
