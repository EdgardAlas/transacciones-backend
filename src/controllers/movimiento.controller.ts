import { Request, RequestHandler, Response } from 'express';
import { errorPeticion } from '../helpers/error';

export const insertarMovimiento: RequestHandler = async (req, res) => {
  try {
    const { tipo, monto, usuario_id } = req.body;
    const data = await req.con.query('call insertar_movimiento($1, $2, $3)', [
      tipo ? tipo : null,
      monto !== null ? monto : null,
      usuario_id ? usuario_id : null,
    ]);
    res.json(data.rows);
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const obtenerMovimientos = async (
  req: Request<{ usuario: string }>,
  res: Response
) => {
  try {
    const { usuario } = req.params;
    const data = await req.con.query(
      'select * from movimientos m where m.usuario_id = $1 order by fecha desc;',
      [usuario]
    );
    res.json(data.rows);
  } catch (error) {
    errorPeticion(req, res, error);
  }
};
