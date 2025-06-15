import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { verificarToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', UsuarioController.login);
router.post('/crear', UsuarioController.crearUsuario);
router.get('/obtenerUno/:id', verificarToken, UsuarioController.obtenerUsuarioPorId);
router.delete('/borrarUno/:id', verificarToken, UsuarioController.eliminarUsuario);

export default router;