import { Request, Response } from "express";
import {
  getCategoriaByIdModel,
  getCategoriasModel,
  updateCategoriaByIdModel,
  createCategoriaModel,
} from "../models/categoriaModel";
import {
  createCategoriaSchema,
  updateCategoriaSchema,
} from "../schemas/categoriaSchema";

export async function getCategorias(req: Request, res: Response) {
  try {
    const categorias = await getCategoriasModel();
    res.status(200).json({ data: categorias });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener las categorias",
      details: error.mesagge,
    });
  }
}

export async function createCategoria(req: Request, res: Response) {
  try {
    const validation = createCategoriaSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { nombre, descripcion } = validation.data;

    if (!nombre) {
      return res.status(400).json({
        ok: false,
        message: "El nombre de la categoria es obligatorio.",
      });
    }

    const newCategoria = await createCategoriaModel(nombre, descripcion);

    res.status(201).json({
      ok: true,
      message: "Categoria agregada con exito.",
      data: newCategoria,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear categoria",
      details: error.mesagge,
    });
  }
}

export async function getCategoriaById(req: Request, res: Response) {
  try {
    const categoriaId = Number(req.params.id);

    if (!categoriaId || typeof categoriaId !== "number") {
      return res.status(400).json({
        ok: false,
        message: "Ingrese un ID valido.",
      });
    }

    const categoria = await getCategoriaByIdModel(categoriaId);

    res.status(200).json({
      ok: true,
      message: `Categoria de ID: ${categoriaId} encontrado.`,
      data: categoria,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear categoria",
      details: error.mesagge,
    });
  }
}

export async function updateCategoria(req: Request, res: Response) {
  try {
    const categoriaFindId = Number(req.params.id);

    if (!categoriaFindId || typeof categoriaFindId !== "number") {
      return res.status(404).json({
        ok: false,
        message: "Ingrese un ID valido.",
      });
    }

    const validation = updateCategoriaSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        ok: false,
        message: "Datos inválidos.",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const { nombre, descripcion } = validation.data;

    if (!nombre) {
      return res.status(400).json({
        ok: false,
        message: "Debe agregar por lo menos el nombre.",
      });
    }

    const updatedCategoria = await updateCategoriaByIdModel(categoriaFindId, {
      nombre,
      descripcion,
    });

    return res.status(200).json({
      ok: true,
      message: `Categoria de ID: ${categoriaFindId} actualizado.`,
      data: updatedCategoria,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar categoria",
      details: error.mesagge,
    });
  }
}
