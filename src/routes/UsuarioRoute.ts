import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();

router.post('/crear/usuario', UsuarioController.crearUsuario);
router.get('/obtener/usuarios', UsuarioController.obtenerUsuarios);
router.get('/obtener/usuario/:id', UsuarioController.obtenerUsuarioPorId);
router.put('/actualizar/usuario/:id', UsuarioController.actualizarUsuario);
router.delete('/borrar/usuario/:id', UsuarioController.eliminarUsuario); // faltaba la primera "/"

export default router;