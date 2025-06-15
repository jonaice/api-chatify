import { Router } from 'express';
import { PalabraController } from '../controllers/PalabraController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/obtenerUno/:id', verificarToken, PalabraController.obtenerPalabraPorId);

export default router;