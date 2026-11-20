import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_restaurante_2026";

export type RolUsuario = "MESERO" | "GERENTE";

export interface JwtPayloadUsuario {
  id: number;
  correo: string;
  rol: RolUsuario;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: JwtPayloadUsuario;
    }
  }
}

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      mensaje: "Acceso denegado. Debes enviar un token Bearer",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      mensaje: "Acceso denegado. Token mal formado",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayloadUsuario;
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado",
    });
  }
};
export const autorizarRoles = (...rolesPermitidos: RolUsuario[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: `Acceso denegado. Se requiere perfil: ${rolesPermitidos.join(" o ")}`,
      });
    }

    next();
  };
};