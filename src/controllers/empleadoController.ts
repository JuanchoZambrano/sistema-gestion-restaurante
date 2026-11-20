import { Request, Response } from "express";
import {
  createEmpleadoModel,
  getEmpleadoByIdModel,
  getEmpleadosModel,
  updateEmpleadoByIdModel,
} from "../models/empleadoModel";
import {
  createEmpleadoSchema,
  updateEmpleadoSchema,
} from "../schemas/empleadoSchema";

export async function getEmpleados(req: Request, res: Response) {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Consultar empleados'
    #swagger.description = 'Obtiene todos los empleados registrados.'
  */
  try {
    const empleados = await getEmpleadosModel();
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
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Crear empleado'
    #swagger.description = 'Crea un empleado.'
  */
  try {
    const validation = createEmpleadoSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { nombre, telefono, cargo } = validation.data;

    if (!nombre || !cargo) {
      return res.status(404).json({
        ok: false,
        message: "El Nombre y el cargo son obligatorios.",
      });
    }

    const newEmpleado = await createEmpleadoModel(nombre, cargo, telefono);

    res.status(201).json({
      ok: true,
      message: "Empleado agregado con exito.",
      data: newEmpleado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los empleados",
      details: error.mesagge,
    });
  }
}

export async function getEmpleadoById(req: Request, res: Response) {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Buscar empleado por su ID.'
    #swagger.description = 'Ingresa el ID para obtener el empleado.'
  */
  try {
    const empleadoId = Number(req.params.id);

    if (!empleadoId || typeof empleadoId !== "number") {
      return res.status(400).json({
        ok: false,
        message: "Ingrese un ID valido.",
      });
    }

    const empleado = await getEmpleadoByIdModel(empleadoId);

    res.status(200).json({
      ok: true,
      message: `Empleado de ID: ${empleadoId} encontrado.`,
      data: empleado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los empleados",
      details: error.mesagge,
    });
  }
}

export async function updateEmpleado(req: Request, res: Response) {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Actualizar un empleado'
    #swagger.description = 'Ingresa el ID del empleado para actualizarlo.'
  */
  try {
    const empleadoId = Number(req.params.id);

    if (!empleadoId || typeof empleadoId !== "number") {
      return res.status(400).json({
        ok: false,
        message: "Ingrese un ID valido.",
      });
    }

    const validation = updateEmpleadoSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { nombre, telefono, cargo } = validation.data;

    if (!nombre || !telefono || !cargo) {
      return res.status(400).json({
        ok: false,
        message: "Debe agregar por lo menos un dato nuevo.",
      });
    }

    const updatedEmpleado = await updateEmpleadoByIdModel(empleadoId, {
      nombre,
      cargo,
      telefono,
    });

    return res.status(200).json({
      ok: true,
      message: `Empleado de ID: ${empleadoId} actualizado.`,
      data: updatedEmpleado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener el empleado",
      details: error.mesagge,
    });
  }
}
