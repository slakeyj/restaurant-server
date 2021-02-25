const { Pool } = require('pg');

const devConfig = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
};
const pool = new Pool(
  process.env.NODE_ENV === 'production' ? productionConfig : devConfig
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
