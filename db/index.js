const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/yelp.db', err => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the database.');
});

module.exports = {
  query: (sql, params) =>
    new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve({ rows });
        }
      });
    }),
};
