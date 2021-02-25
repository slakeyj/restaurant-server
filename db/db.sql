DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  LOCATION VARCHAR(50) NOT NULL,
  PRICE_RANGE INT NOT NULL
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(rating >=1 and rating <=5)
);