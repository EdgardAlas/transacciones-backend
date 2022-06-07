import { Request, RequestHandler, Response } from 'express';
import { errorPeticion } from '../helpers/error';

export const obtenerEmpleos: RequestHandler = async (req, res) => {
  try {
    const data = await req.con.query('select * from obtener_empleos');
    res.json(data.rows);
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const obtenerEmpleo = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const data = await req.con.query(
      'select * from obtener_empleos where id = $1 limit 1',
      [req.params.id]
    );
    res.json(data.rows.length > 0 ? data.rows[0] : {});
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const insertarEmpleo: RequestHandler = async (req, res) => {
  try {
    const { empleo } = req.body;
    const data = await req.con.query('call insertar_empleo($1)', [
      empleo ? empleo : null,
    ]);
    res.json(data.rows);
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const eliminarEmpleo = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    await req.con.query(`call delete_empleo($1)`, [req.params.id]);
    return res.json({ accion: 'DELETE;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const actualizaEmpleo = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { empleo } = req.body;
    await req.con.query('call update_empleo($1, $2)', [
      empleo ? empleo : null,
      req.params.id,
    ]);
    return res.json({ accion: 'UPDATE;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};
