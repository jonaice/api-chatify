import { Request, Response } from 'express';
import db from '../config/database';

export class OpcionesPreguntaController {

  static async obtenerOpcionesPorPregunta(req: Request, res: Response) {
    const { pregunta_id } = req.params;

    try {
      const result = await db.query(
        `SELECT 
          op.id AS opcion_id,
          op.pregunta_id,
          op.palabra_id,
          op.es_correcta,
          p.palabra_espanol,
          p.palabra_ingles,
          p.descripcion_espanol,
          p.descripcion_ingles
        FROM opciones_pregunta op
        JOIN palabra p ON op.palabra_id = p.id
        WHERE op.pregunta_id = $1`,
        [pregunta_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron opciones para esta pregunta.' });
      }

      // Reestructuramos los resultados
      const opciones = result.rows.map((row: any) => ({
        id: row.opcion_id,
        pregunta_id: row.pregunta_id,
        palabra_id: row.palabra_id,
        es_correcta: row.es_correcta,
        palabra: {
          palabra_espanol: row.palabra_espanol,
          palabra_ingles: row.palabra_ingles,
          descripcion_espanol: row.descripcion_espanol,
          descripcion_ingles: row.descripcion_ingles
        }
      }));

      res.json(opciones);
    } catch (error) {
      console.error('Error al obtener opciones:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }

}
