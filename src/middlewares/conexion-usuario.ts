import { RequestHandler } from 'express';
import { Client } from 'pg';
import { v4 } from 'uuid';
import { conexiones } from '../db/conexiones';

export const asignarConexion: RequestHandler = async (req, res, next) => {
  if (!req.session.id_conexion) {
    req.session.id_conexion = v4();

    conexiones[req.session.id_conexion] = new Client();

    await conexiones[req.session.id_conexion].connect();
  }
  next();
};

export const recuperarConexion: RequestHandler = (req, _, next) => {
  req.con = conexiones[req.session.id_conexion!];
  next();
};
