// eslint-disable-next-line import/no-extraneous-dependencies
const { Client } = require('pg');

// conexão ao banco de dados
const client = new Client({
  host: 'localhost',
  port: '5432',
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

// executar a conexão
client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
