import { Router } from 'express';
import {
  actualizarUsuario,
  borrarUsuario,
  insertarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from '../controllers';

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', obtenerUsuarios);
usuariosRouter.get('/usuario/:id', obtenerUsuario);
usuariosRouter.post('/usuario', insertarUsuario);
usuariosRouter.put('/usuario/:id', actualizarUsuario);
usuariosRouter.delete('/usuario/:id', borrarUsuario);

export default usuariosRouter;
