import expressSession from 'express-session';

const unDia = 1000 * 60 * 60 * 24;

export default expressSession({
  secret: 'R8LKpk6Jz8AmG9yzg4ZDnNjM0bEfUkoWvQpkPxTdquFqgU8bWA',
  saveUninitialized: true,
  cookie: { maxAge: unDia },
  resave: false,
});
