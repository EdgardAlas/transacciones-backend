import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { cors, morgan, sesion } from './middlewares';
import {
  asignarConexion,
  recuperarConexion,
} from './middlewares/conexion-usuario';
import {
  empleosRouter,
  frontedRouter,
  movimientosRouter,
  transaccionesRouter,
  usuariosRouter,
} from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

//* Middlewares

app.use(cors);
app.use(express.json());
app.use(morgan);
app.use(sesion);
app.use(cookieParser());
app.use(asignarConexion);
app.use(recuperarConexion);
app.use(express.static('public'));

// * Rutas

app.use('/api', usuariosRouter);
app.use('/api', empleosRouter);
app.use('/api', movimientosRouter);
app.use('/api', transaccionesRouter);
app.use(frontedRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});
