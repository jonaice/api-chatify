import { Request, Response } from 'express';
import db from '../config/database';
import { Palabra } from '../models/Palabra';

export class PalabraController {

  static async obtenerPalabraPorId(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await db.query<Palabra>(
        'SELECT id, palabra_espanol, palabra_ingles, descripcion_espanol, descripcion_ingles FROM palabra WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'Palabra no encontrada.' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener palabra:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
  static async obtenerTodos(req: Request, res: Response) {

    try {
      const result = await db.query<Palabra>(
        'SELECT id, palabra_espanol, palabra_ingles, descripcion_espanol, descripcion_ingles FROM palabra ',
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'No hay palabras disponibles' });
      }

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener palabras', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
  static async obtenerAlgunos(req: Request, res: Response) {
    try {
      const result = await db.query(
        `SELECT 
        p.id, 
        p.palabra_espanol, 
        p.palabra_ingles, 
        p.descripcion_espanol, 
        p.descripcion_ingles,
        a.url_audio_cloudinary
      FROM palabra p
      JOIN audio a ON p.id = a.palabra_id
      WHERE p.id BETWEEN 1 AND 15
      ORDER BY p.id ASC`
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'No hay palabras disponibles con audio.' });
      }

      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener palabras con audio', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
}
