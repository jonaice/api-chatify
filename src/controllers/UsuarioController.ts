import { Request, Response } from 'express';
import db from '../config/database';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsuarioController {

  static async login(req: Request, res: Response) {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
    }

    try {
      const result = await db.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
      if (result.rows.length === 0) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const usuario = result.rows[0];
      const passwordValido = await bcrypt.compare(password, usuario.password);

      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET || 'secreto',
        {
          expiresIn: '7d', // 7 días
        }
      );

      res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

  static async crearUsuario(req: Request, res: Response) {
    const { nombre, correo, password } = req.body;
    if (!nombre || !correo || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
    }

    try {
      await db.query(
        'INSERT INTO usuario (nombre, correo, password) VALUES ($1, $2, $3)',
        [nombre, correo, password]
      );
      res.status(201).json({ mensaje: 'Usuario creado correctamente.' });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ mensaje: 'Error al crear usuario.' });
    }
  }

  static async obtenerUsuarioPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await db.query(
        'SELECT id, nombre, correo FROM usuario WHERE id = $1',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

  static async actualizarUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, correo, password } = req.body;

    try {
      await db.query(
        'UPDATE usuario SET nombre = $1, correo = $2, password = $3 WHERE id = $4',
        [nombre, correo, password, id]
      );
      res.json({ mensaje: 'Usuario actualizado correctamente.' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ mensaje: 'Error al actualizar usuario.' });
    }
  }

  static async eliminarUsuario(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db.query('DELETE FROM usuario WHERE id = $1', [id]);
      res.json({ mensaje: 'Usuario eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ mensaje: 'Error al eliminar usuario.' });
    }
  }
}
