import { Client } from 'pg';

type TConexiones = {
  [id: string]: Client;
};
export const conexiones: TConexiones = {};
