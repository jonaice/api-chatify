import { Router } from 'express';
import { VozController } from '../controllers/VozController';
import { verificarToken } from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

// Aplica multer para capturar el archivo con clave 'audio'
router.post(
  '/transcribir',
  verificarToken,
   (req, res, next) => {
    console.log("🧾 Headers:", req.headers);
    console.log("🧾 Content-Type:", req.headers['content-type']);
    next();
  },
  upload.single('audio'), // <== esta línea es clave
  VozController.transcribirAudio
);

export default router;
