import { Router } from "express";
import {
  getCategoriaById,
  getCategorias,
  updateCategoria,
  createCategoria,
} from "../controllers/categoriaController";

const router = Router();

router.get("/", getCategorias);
router.post("/", createCategoria);
router.get("/:id", getCategoriaById);
router.put("/:id", updateCategoria);

export default router;
