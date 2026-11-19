import { Router } from "express";
import {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
} from "../controllers/pedido.controller";
import {
  validarCrearPedido,
  validarActualizarPedido,
} from "../middlewares/pedido.middleware";

const router = Router();

router.get("/", obtenerPedidos);
router.get("/:id", obtenerPedidoPorId);
router.post("/", validarCrearPedido, crearPedido);
router.put("/:id", validarActualizarPedido, actualizarPedido);
router.delete("/:id", eliminarPedido);

export default router;