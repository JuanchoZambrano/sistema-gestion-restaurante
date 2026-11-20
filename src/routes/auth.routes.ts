import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

// Si ya tienes un middleware genérico de validación Zod, úsalo aquí;
// si no, puedes usar esta validación directa con safeParse:
const validarBody = (schema: typeof registerSchema | typeof loginSchema) => {
  return (req: any, res: any, next: any) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
      return res.status(400).json({
        mensaje: "Datos inválidos",
        errores: resultado.error.flatten().fieldErrors,
      });
    }
    req.body = resultado.data;
    next();
  };
};

router.post("/register", validarBody(registerSchema), register);
router.post("/login", validarBody(loginSchema), login);

export default router;