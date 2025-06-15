import { Router } from 'express';
import { PreguntaController } from '../controllers/PreguntaController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/obtenerTodos',verificarToken, PreguntaController.obtenerTodasPreguntas);

export default router;