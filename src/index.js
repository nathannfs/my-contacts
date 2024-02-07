const express = require('express');

// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(cors);
app.use(routes);
app.use(errorHandler);

// subir uma porta no express
app.listen(3001, () => {
  console.log('Server started at http://localhost:3001');
});
