import { Router } from "express";
import {
  obtenerDetallePedidos,
  obtenerDetallePedidoPorId,
  crearDetallePedido,
  actualizarDetallePedido,
  eliminarDetallePedido,
} from "../controllers/detallePedido.controller";
import {
  validarCrearDetallePedido,
  validarActualizarDetallePedido,
} from "../middlewares/detallePedido.middleware";

const router = Router();

router.get("/", obtenerDetallePedidos);
router.get("/:id", obtenerDetallePedidoPorId);
router.post("/", validarCrearDetallePedido, crearDetallePedido);
router.put("/:id", validarActualizarDetallePedido, actualizarDetallePedido);
router.delete("/:id", eliminarDetallePedido);

export default router;