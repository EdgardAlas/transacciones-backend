import { Request, RequestHandler, Response } from 'express';
import { errorPeticion } from '../helpers/error';

export const iniciarTransaccion: RequestHandler = async (req, res) => {
  try {
    if (!req.session.transaccion_iniciada) {
      req.session.transaccion_iniciada = true;
      await req.con.query(
        `BEGIN TRANSACTION ISOLATION LEVEL ${req.body.aislamiento}`
      );
    }
    return res.json({ accion: 'BEGIN;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const commitTransaccion: RequestHandler = async (req, res) => {
  try {
    await req.con.query('COMMIT;');
    req.session.transaccion_iniciada = false;
    return res.json({ accion: 'commit' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const rollbackTransaccion: RequestHandler = async (req, res) => {
  try {
    await req.con.query('ROLLBACK;');
    req.session.transaccion_iniciada = false;
    return res.json({ accion: 'ROLLBACK;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const rollbackTransaccionASavepoint = async (
  req: Request<{ savepoint: string }>,
  res: Response
) => {
  try {
    await req.con.query(`ROLLBACK to ${req.params.savepoint};`);
    req.session.transaccion_iniciada = false;
    return res.json({ accion: 'ROLLBACK;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};

export const crearSavepoint: RequestHandler = async (req, res) => {
  try {
    await req.con.query(`SAVEPOINT ${req.body.savepoint};`);
    req.session.transaccion_iniciada = false;
    return res.json({ accion: 'ROLLBACK;' });
  } catch (error) {
    errorPeticion(req, res, error);
  }
};
