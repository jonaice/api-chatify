import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import { ExamenAplicadoController } from '../controllers/ExamenAplicadoController';


const router = Router();

router.post('/crearRegistro', verificarToken, ExamenAplicadoController.crearRegistro);

export default router;