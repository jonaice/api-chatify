import { Request, Response } from 'express';
import db from '../config/database';

export class OpcionesPreguntaController {

  static async obtenerOpcionesPorPregunta(req: Request, res: Response) {
    try {
      const result = await db.query('SELECT id, enunciado FROM pregunta');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener preguntas:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

}
