import { Router } from "express";
import { getEmpleadoById, getEmpleados, updateEmpleado, createEmpleado } from "../controllers/empleadoController";

const router = Router();

router.get("/", getEmpleados);
router.post("/", createEmpleado);
router.get("/:id", getEmpleadoById);
router.put("/:id", updateEmpleado);

export default router;