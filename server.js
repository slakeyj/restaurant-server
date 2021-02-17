const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./db');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * from restaurants');
    console.log('results', results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    res.send({ message: err });
  }
});

// get one restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      // do not use template literal, vulnerable to sql injection attack, use parameterized query instead
      'select * from restaurants where id = $1',
      [req.params.id]
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    res.send({ message: err });
  }
});

// create a restaurant

app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO restaurants(name, location, price_range) values($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    res.send({ message: err });
  }
});

// update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
  } catch (err) {
    res.send({ message: err });
  }
  const results = await db.query(
    'UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *',
    [req.body.name, req.body.location, req.body.price_range, req.params.id]
  );
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: results.rows[0],
    },
  });
});

// delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM restaurants where id = $1', [req.params.id]);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.send({ message: err });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
