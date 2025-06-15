import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', UsuarioController.login);
router.post('/crear', UsuarioController.crearUsuario);
router.get('/obtenerUno/:id', UsuarioController.obtenerUsuarioPorId);
router.delete('/borrarUno/:id', UsuarioController.eliminarUsuario);

export default router;