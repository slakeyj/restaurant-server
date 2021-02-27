const { Pool } = require('pg');

const devConfig = {
  connectionString: process.env.DATABASE_URL,
};
const pool = new Pool(devConfig);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
