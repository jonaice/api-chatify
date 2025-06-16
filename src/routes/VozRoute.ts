import { Router } from 'express';
import { VozController } from '../controllers/VozController';
import { verificarToken } from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';

import { Request, Response } from 'express';

const router = Router();

// Aplica multer para capturar el archivo con clave 'audio'
router.post(
  '/transcribir',
  verificarToken,
  upload.single('audio'),
  (err: any, req: Request, res: Response, next: Function) => {
    if (err) {
      console.error(" Error en multer:", err);
      return res.status(400).json({ mensaje: 'Error en la carga del audio', detalle: err.message });
    }
    next();
  },
  VozController.transcribirAudio
);
export default router;
