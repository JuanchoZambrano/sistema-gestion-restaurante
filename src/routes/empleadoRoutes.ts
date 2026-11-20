import { Router } from "express";
import { getEmpleadoById, getEmpleados, updateEmpleado, createEmpleado, deactivateEmpleado, getInactiveEmpleados } from "../controllers/empleadoController";

const router = Router();

router.get("/", getEmpleados);
router.get("/inactive", getInactiveEmpleados);
router.post("/", createEmpleado);
router.get("/:id", getEmpleadoById);
router.put("/:id", updateEmpleado);
router.patch("/:id", deactivateEmpleado);

export default router;