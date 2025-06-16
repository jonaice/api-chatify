import { Router } from 'express';
import { PalabraController } from '../controllers/PalabraController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/obtenerTodos', verificarToken, PalabraController.obtenerTodos);
router.get('/obtenerUno/:id', verificarToken, PalabraController.obtenerPalabraPorId);
router.get('/obtenerSoloQuince', verificarToken, PalabraController.obtenerAlgunos);


export default router;