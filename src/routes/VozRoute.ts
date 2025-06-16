import { Router } from 'express';
import { VozController } from '../controllers/VozController';
import { verificarToken } from '../middlewares/authMiddleware';

import { Request, Response } from 'express';

const router = Router();

// Aplica multer para capturar el archivo con clave 'audio'
router.post(
  '/transcribir',
  verificarToken,
  VozController.transcribirAudio
);
export default router;
