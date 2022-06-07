import { Router } from 'express';
import path from 'path';

const frontedRouter = Router();

frontedRouter.use('*', async (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
    //const data = await req.con.query('select * from obtener_usuarios');
    //res.json(data.rows);
  } catch (error) {
    //await req.con.query('ROLLBACK;');
    //req.session.transaccion_iniciada = false;
    res.status(500).json({ error });
  }
});

export default frontedRouter;
