import { Request, Response } from 'express';
import { AssemblyAI } from 'assemblyai';
import cloudinary from '../config/cloudinary';
import fs from 'fs';

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY || '',
});

export class VozController {
  static async transcribirAudio(req: Request, res: Response) {
    try {
      // Verificar que se recibió el archivo
      const archivo = req.files?.audio;

      if (!archivo || Array.isArray(archivo)) {
        return res.status(400).json({ mensaje: 'No se envió el archivo de audio.' });
      }

      // Ruta temporal del archivo
      const rutaTemporal = (archivo as any).tempFilePath;

      // Subir a Cloudinary
      const uploadResult = await cloudinary.uploader.upload(rutaTemporal, {
        resource_type: 'video', // Cloudinary trata audio como video
        folder: 'audios',
      });

      // Eliminar archivo local después de subir
      fs.unlinkSync(rutaTemporal);

      const audioUrl = uploadResult.secure_url;
      const publicId = uploadResult.public_id;

      // Transcripción con AssemblyAI
      const transcript = await client.transcripts.transcribe({
        audio: audioUrl,
        speech_model: 'universal',
      });

      // Eliminar archivo de Cloudinary
      await cloudinary.uploader.destroy(publicId, {
        resource_type: 'video',
      });

      return res.status(200).json({ texto: transcript.text });

    } catch (error) {
      console.error('Error en transcripción:', error);
      return res.status(500).json({ mensaje: 'Error al procesar el audio' });
    }
  }
}
