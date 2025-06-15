import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import { ExamenAplicadoController } from '../controllers/ExamenAplicadoController';


const router = Router();

router.post('/crearRegistro', ExamenAplicadoController.crearRegistro);

export default router;