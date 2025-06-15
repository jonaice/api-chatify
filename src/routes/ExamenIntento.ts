import { Router } from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import { ExamenIntento } from '../controllers/ExamenIntento';


const router = Router();

router.post('/crearRegistro', verificarToken, ExamenIntento.crearRegistro);

export default router;