import { Request, Response } from 'express';
import db from '../config/database';

export class ExamenAplicadoController {

  // Verifica si la palabra es la opción correcta para esa pregunta
  static async verificarRespuesta(pregunta_id: number, palabra_id: number): Promise<boolean> {
    try {
      const result = await db.query(
        `SELECT es_correcta FROM opciones_pregunta 
         WHERE pregunta_id = $1 AND palabra_id = $2`,
        [pregunta_id, palabra_id]
      );

      if (result.rows.length === 0) return false;
      return result.rows[0].es_correcta;
    } catch (error) {
      console.error('Error verificando respuesta:', error);
      return false;
    }
  }

  // Crea un registro de respuesta aplicada por el usuario
  static async crearRegistro(req: Request, res: Response) {
    const { usuario_id, pregunta_id, palabra_id_respuesta } = req.body;

    if (!usuario_id || !pregunta_id || !palabra_id_respuesta) {
      return res.status(400).json({ mensaje: 'Faltan datos obligatorios.' });
    }

    try {
      const esCorrecta = await this.verificarRespuesta(pregunta_id, palabra_id_respuesta);

      await db.query(
        `INSERT INTO examen_aplicado (usuario_id, pregunta_id, palabra_id_respuesta, es_correcta)
         VALUES ($1, $2, $3, $4)`,
        [usuario_id, pregunta_id, palabra_id_respuesta, esCorrecta]
      );

      res.status(201).json({
        flag: true,
        mensaje: 'Respuesta de examen guardado',
      });
    } catch (error) {
      console.error('Error al registrar el examen:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
}
