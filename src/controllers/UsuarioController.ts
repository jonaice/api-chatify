import { Request, Response } from 'express';
import db from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';

export class UsuarioController {

  static async login(req: Request, res: Response) {
    const { correo, password } = req.body as Pick<Usuario, 'correo' | 'password'>;

    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
    }

    try {
      const result = await db.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
      if (result.rows.length === 0) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const usuario: Usuario = result.rows[0];
      const passwordValido = await bcrypt.compare(password, usuario.password);

      if (!passwordValido) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
      }

      const token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET || 'secreto',
        { expiresIn: '7d' } // 7 días
      );

      res.status(200).json({
        flag: true,
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

  static async crearUsuario(req: Request, res: Response) {
    const { nombre, correo, password } = req.body as Usuario;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
    }

    try {
      // Verificar si el usuario ya existe
      const result = await db.query(
        'SELECT id FROM usuario WHERE correo = $1',
        [correo]
      );

      if (result.rows.length > 0) {
        return res.status(409).json({ mensaje: 'El correo ya está registrado.' });
      }

      // Encriptar contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar usuario
      const insertResult = await db.query(
        'INSERT INTO usuario (nombre, correo, password) VALUES ($1, $2, $3) RETURNING id, nombre, correo',
        [nombre, correo, hashedPassword]
      );

      const nuevoUsuario = insertResult.rows[0];

      // Generar token JWT
      const token = jwt.sign(
        { id: nuevoUsuario.id },
        process.env.JWT_SECRET || 'secreto',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        flag: true,
        token,
        usuario: nuevoUsuario,
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.status(500).json({ mensaje: 'Error al crear usuario.' });
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

      const usuario: Usuario = result.rows[0];
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ flag: false, mensaje: 'Error interno del servidor.' });
    }
  }

  static async eliminarUsuario(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await db.query('DELETE FROM usuario WHERE id = $1', [id]);
      res.json({ flag: true, mensaje: 'Usuario eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ flag: false, mensaje: 'Error al eliminar usuario.' });
    }
  }
}
