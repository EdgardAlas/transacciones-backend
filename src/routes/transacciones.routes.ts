import { Router } from 'express';
import {
  commitTransaccion,
  iniciarTransaccion,
  rollbackTransaccionASavepoint,
  rollbackTransaccion,
  crearSavepoint,
} from '../controllers/transacciones.controller';

const transaccionesRouter = Router();

transaccionesRouter.post('/iniciar-transaccion', iniciarTransaccion);
transaccionesRouter.post('/commit', commitTransaccion);
transaccionesRouter.post('/rollback', rollbackTransaccion);
transaccionesRouter.post('/savepoint', crearSavepoint);
transaccionesRouter.post('/rollback/:savepoint', rollbackTransaccionASavepoint);

export default transaccionesRouter;
