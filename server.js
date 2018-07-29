const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // Se usa par aguardar las sessiones en mongodb

const conn = require('./conecction');
const port = 8080;

const app = express();

// Esto es un middleware -> La función se ejecuta cada vez que la aplicación recibe una solicitud.
app.use(session({
  secret: process.env.SESSION_SECRET || 'some-secret',
  // resave: true, investigar mas -> https://www.npmjs.com/package/express-session
  resave: false,
  // saveUninitialized: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: conn,
  })
}));

app.get('/', (req, res) => {
  // console.log(req.session);
  // Cuenta es el nombre que le damos y lo agregamos al object session
  req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1
  res.status(200).send(`Hola has visto esta página ${req.session.cuenta}`);
});

app.listen(port, () => {
  console.log(`Escuchando en el port ${port}`);
});
