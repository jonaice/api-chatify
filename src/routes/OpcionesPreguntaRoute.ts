import { Router } from 'express';
import { PreguntaController } from '../controllers/PreguntaController';
import { verificarToken } from '../middlewares/authMiddleware';
import { OpcionesPreguntaController } from '../controllers/OpcionesPreguntaController';


const router = Router();

router.get('/obtener/porPregunta/:pregunta_id', verificarToken,OpcionesPreguntaController.obtenerOpcionesPorPregunta);

export default router;