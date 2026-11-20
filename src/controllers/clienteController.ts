import { Request, Response } from "express";
import {
  getClientesModel,
  createClienteModel,
  updateClienteModel,
  getClienteByIdModel
} from "../models/clienteModel";
import {
  createClienteSchema,
  updateClienteSchema,
} from "../schemas/clienteSchema";

export async function getClientes(req: Request, res: Response) {
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Consultar clientes'
    #swagger.description = 'Obtiene todos los clientes registrados.'
  */
  try {
    const clientes = await getClientesModel();
    res.status(200).json({ data: clientes });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener los clientes",
      details: error.mesagge,
    });
  }
}

export async function createCliente(req: Request, res: Response) {
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Crear cliente'
    #swagger.description = 'Crea un cliente.'
  */
  try {
    const validation = createClienteSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { nombre, telefono, correo } = validation.data;

    if (!nombre || !correo) {
      return res.status(400).json({
        ok: false,
        message: "El nombre y el correo del cliente son obligatorios.",
      });
    }

    const newCliente = await createClienteModel(nombre, correo, telefono);

    res.status(201).json({
      ok: true,
      message: "Cliente agregado con exito.",
      data: newCliente,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear cliente",
      details: error.mesagge,
    });
  }
}

export async function getClienteById(req: Request, res: Response) {
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Buscar cliente por su ID.'
    #swagger.description = 'Ingresa el ID para obtener el cliente.'
  */
  try {
    const clienteId = Number(req.params.id);

    if (!clienteId || typeof clienteId !== "number") {
      return res.status(400).json({
        ok: false,
        message: "Ingrese un ID valido.",
      });
    }

    const cliente = await getClienteByIdModel(clienteId);

    res.status(200).json({
      ok: true,
      message: `Cliente de ID: ${clienteId} encontrado.`,
      data: cliente,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear cliente",
      details: error.mesagge,
    });
  }
}

export async function updateCliente(req: Request, res: Response) {
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Actualizar un cliente'
    #swagger.description = 'Ingresa el ID del cliente para actualizarlo.'
  */
  try {
    const clienteFindId = Number(req.params.id);

    if (!clienteFindId) {
      return res.status(404).json({
        ok: false,
        message: "No se proporciona un ID.",
      });
    }

    const validation = updateClienteSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { nombre, telefono, correo } = validation.data;

    if (!nombre || !telefono || !correo) {
      return res.status(400).json({
        ok: false,
        message: "Debe agregar por lo menos un dato nuevo.",
      });
    }

    const updatedCliente = await updateClienteModel(clienteFindId, {
      nombre,
      telefono,
      correo,
    });

    return res.status(200).json({
      ok: true,
      message: `Cliente de ID: ${clienteFindId} actualizado.`,
      data: updatedCliente,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "error al obtener los clientes",
      details: error.mesagge,
    });
  }
}
