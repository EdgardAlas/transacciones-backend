import expressSession from 'express-session';

const unDia = 1000 * 60 * 60 * 24;

export default expressSession({
  secret: process.env.SECREY_KEY!,
  saveUninitialized: true,
  cookie: { maxAge: unDia },
  resave: false,
});
