const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
  res.status(200).json({
    status: 'success',

    data: {
      restaurant: ['mcdonalds', 'wendys'],
    },
  });
});

// get one restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  console.log('req', req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'mickey ds',
    },
  });
});

// create a restaurant
app.post('/api/v1/restaurants', (req, res) => {
  console.log('req post', req.body);
  res.status(201).json({
    status: 'success',
    data: {
      restaurant: 'mickey ds',
    },
  });
});

// update restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
  console.log('update restaurant', req.params.id);
  console.log('update req.body', req.body);
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'mickey ds',
    },
  });
});

// delete restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
