import { Request, Response } from 'express';
import db from '../config/database';

export class UsuarioController {
    
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

  static async obtenerUsuarios(_req: Request, res: Response) {
    try {
      const result = await db.query('SELECT id, nombre, correo FROM usuario');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ mensaje: 'Error al obtener usuarios.' });
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
