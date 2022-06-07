import { Router } from 'express';
import {
  insertarMovimiento,
  obtenerMovimientos,
} from '../controllers/movimiento.controller';

const movimientosRouter = Router();

movimientosRouter.get('/movimientos/:usuario', obtenerMovimientos);
movimientosRouter.post('/movimiento', insertarMovimiento);

export default movimientosRouter;
