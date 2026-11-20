import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_restaurante_2026";

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    const correoNormalizado = correo.trim().toLowerCase();

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { correo: correoNormalizado },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: "Ya existe un usuario registrado con ese correo",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre: nombre.trim(),
        correo: correoNormalizado,
        password: passwordHash,
        rol: rol ?? "MESERO",
      },
      select: {
        id: true,
        nombre: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al registrar el usuario",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body;

    const correoNormalizado = correo.trim().toLowerCase();

    const usuario = await prisma.usuario.findUnique({
      where: { correo: correoNormalizado },
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas o usuario inactivo",
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al iniciar sesión",
      error,
    });
  }
};