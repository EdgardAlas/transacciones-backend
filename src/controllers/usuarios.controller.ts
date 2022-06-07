import { Request, RequestHandler, Response } from 'express';
import { errorPeticion } from '../helpers/error';

export const obtenerUsuarios: RequestHandler = async (req, res) => {
  try {
    const data = await req.con.query('select * from obtener_usuarios');
    res.json(data.rows);
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const obtenerUsuario = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const data = await req.con.query(
      'select * from obtener_usuarios where id = $1 limit 1',
      [req.params.id]
    );
    res.json(data.rows.length > 0 ? data.rows[0] : {});
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const insertarUsuario: RequestHandler = async (req, res) => {
  try {
    const { nombre, apellido, correo, direccion, empleo_id } = req.body;
    const data = await req.con.query(
      'call insertar_usuario($1, $2, $3, $4, $5)',
      [
        nombre ? nombre : null,
        apellido ? apellido : null,
        correo ? correo : null,
        direccion ? direccion : null,
        empleo_id ? empleo_id : null,
      ]
    );
    res.json(data.rows);
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const borrarUsuario = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    await req.con.query(`call delete_usuario($1)`, [req.params.id]);
    return res.json({ accion: 'DELETE;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const actualizarUsuario = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { nombre, apellido, correo, empleo_id, direccion } = req.body;
    await req.con.query('call update_usuario($1, $2, $3, $4, $5, $6)', [
      nombre ? nombre : null,
      apellido ? apellido : null,
      direccion ? direccion : null,
      correo ? correo : null,
      empleo_id ? empleo_id : null,
      req.params.id ? req.params.id : null,
    ]);
    return res.json({ accion: 'UPDATE;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};
