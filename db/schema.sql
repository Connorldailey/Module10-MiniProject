DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

\c movie_db

DROP TABLE IF EXISTS movies;
CREATE TABLE movie_names (
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(100)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE movie_reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    review TEXT
);

