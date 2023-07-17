const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

// Middleware para tratamento de erros
app.use((error, request, response, next) => {
  console.log('### Error Handler');
  console.log(error);
  response.sendStatus(500);
});

// subir uma porta no express
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
