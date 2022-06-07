import { Router } from 'express';
import {
  actualizaEmpleo,
  eliminarEmpleo,
  insertarEmpleo,
  obtenerEmpleo,
  obtenerEmpleos,
} from '../controllers';

const empleosRouter = Router();

empleosRouter.get('/empleos', obtenerEmpleos);
empleosRouter.get('/empleo/:id', obtenerEmpleo);
empleosRouter.post('/empleo', insertarEmpleo);
empleosRouter.put('/empleo/:id', actualizaEmpleo);
empleosRouter.delete('/empleo/:id', eliminarEmpleo);

export default empleosRouter;
