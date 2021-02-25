const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'dbuser',
//   host: 'localhost',
//   database: 'dbname',
//   password: 'secretpassword',
//   port: 3211,
// });

// don't need to add environmental variables here because pg knows to look for them
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
