import session from 'express-session';
import express from 'express';

declare module 'express-session' {
  interface SessionData {
    id_conexion: string;
    transaccion_iniciada: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      con: Client;
    }
  }
}
