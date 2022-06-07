import { Request, Response } from 'express';

export const errorPeticion = async (
  req: Request,
  res: Response,
  error: any
) => {
  const err = error as TypeError;
  req.session.transaccion_iniciada = false;
  await req.con.query('ROLLBACK;');
  res.status(500).json({ mensaje: err.message, error });
};
