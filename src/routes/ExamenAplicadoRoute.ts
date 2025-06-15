import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import { ExamenAplicadoController } from '../controllers/ExamenAplicadoController';


const router = Router();

router.get('/obtener/porPregunta/:pregunta_id', ExamenAplicadoController.crearRegistro);

export default router;