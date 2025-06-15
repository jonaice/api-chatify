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

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener palabras', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

}
