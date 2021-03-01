const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/index.js');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const restaurantRatingsData = await db.query(
      'select * from restaurants left join (select restaurant_id, COUNT(*) as count, AVG(rating) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;'
    );

    res.status(200).json({
      status: 'success',
      results: restaurantRatingsData.rows.length,
      data: {
        restaurant: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).send({ message: err });
  }
});

// get one restaurant and reviews
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await db.query(
      'select * from restaurants where id = $1;',
      [req.params.id]
    );

    const averageAndCount = await db.query(
      'select * from restaurants left join (select restaurant_id, COUNT(*) as count, AVG(rating) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1 ;',
      [req.params.id]
    );

    const reviews = await db.query(
      'select * from reviews where restaurant_id = $1',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
        average_rating: averageAndCount.rows[0].average_rating,
        count: averageAndCount.rows[0].count,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

// create a restaurant

app.post('/api/v1/restaurants', async (req, res) => {
  try {
    await db.query(
      'INSERT INTO restaurants(name, location, price_range) values($1, $2, $3)',
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: 'success',
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});

// update restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: 'success',
      data: {},
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

// delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM reviews where restaurant_id = $1', [
      req.params.id,
    ]);
    await db.query('DELETE FROM restaurants where id = $1', [req.params.id]);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

app.post('/api/v1/restaurants/:id/add-review', async (req, res) => {
  try {
    await db.query(
      'INSERT INTO reviews(restaurant_id, name, review, rating) values ($1, $2, $3, $4)',
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    rres.status(201).json({
      status: 'success',
      data: {},
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
