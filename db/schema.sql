DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

\c movie_db

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(100)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    review TEXT,
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE SET NULL
);

