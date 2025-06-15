import { Router } from 'express';
import { PreguntaController } from '../controllers/PreguntaController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/obtenerTodos', PreguntaController.obtenerTodasPreguntas);

export default router;