DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(rating >=1 and rating <=5)
);