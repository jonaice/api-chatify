import { Request, Response } from 'express';
import db from '../config/database';
import { OpcionesPregunta } from '../models/OpcionesPregunta';

export class OpcionesPreguntaController {

  static async obtenerOpcionesPorPregunta(req: Request, res: Response) {
    const { pregunta_id } = req.params;

    try {
      const result = await db.query<OpcionesPregunta>(
        'SELECT id, pregunta_id, palabra_id, es_correcta FROM opciones_pregunta WHERE pregunta_id = $1',
        [pregunta_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron opciones para esta pregunta.' });
      }

      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener opciones:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

}
