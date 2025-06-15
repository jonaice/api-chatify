import { Request, Response } from 'express';
import db from '../config/database';

export class ExamenIntento {

  // Calcula la calificación del usuario basándose en respuestas correctas
  static async calcularCalificacion(usuario_id: number): Promise<string> {
    try {
      const result = await db.query(
        `SELECT COUNT(*) AS correctas 
         FROM examen_aplicado 
         WHERE usuario_id = $1 AND es_correcta = true`,
        [usuario_id]
      );

      const correctas = parseInt(result.rows[0].correctas);
      const calificacion = Math.min(10, (correctas * 10 / 15)).toFixed(1); // Máximo 10

      return calificacion;
    } catch (error) {
      console.error('Error al calcular calificación:', error);
      return '0.0';
    }
  }

  // Crea un intento con la calificación calculada
  static async crearRegistro(req: Request, res: Response) {
    const { usuario_id } = req.body;

    if (!usuario_id) {
      return res.status(400).json({ mensaje: 'usuario_id es requerido.' });
    }

    try {
      const calificacion = await this.calcularCalificacion(usuario_id);

      await db.query(
        `INSERT INTO examen_intento (usuario_id, calificacion) VALUES ($1, $2)`,
        [usuario_id, calificacion]
      );

      res.status(201).json({
        flag: true,
        mensaje: 'Registro registrado correctamente',
        calificacion
      });
    } catch (error) {
      console.error('Error al registrar intento:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }
}
