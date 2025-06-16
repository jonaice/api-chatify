import { Router } from 'express';
import { VozController } from '../controllers/VozController';
import { verificarToken } from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

// Aplica multer para capturar el archivo con clave 'audio'
router.post(
  '/transcribir',
  verificarToken,
  upload.single('audio'), // <== esta línea es clave
  VozController.transcribirAudio
);

export default router;
