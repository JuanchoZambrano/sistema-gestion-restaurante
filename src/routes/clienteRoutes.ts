import { Router } from "express";
import { getClientes, createCliente, getClienteById, updateCliente } from "../controllers/clienteController";

const router = Router();

router.get("/", getClientes);
router.post("/", createCliente);
router.get("/:id", getClienteById);
router.put("/:id", updateCliente);

export default router;