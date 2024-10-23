import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET a list of all movies
app.get('/api/movies', (_req, res) => {
    const sql = 'SELECT id, movie_name AS title FROM movies';
    
    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        const { rows } = result;
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

// GET a list of movie reviews
app.get('/api/movie_reviews', (_req, res) => {
    const sql = 'SELECT movies.movie_name, reviews.review FROM reviews JOIN movies ON movies.id = reviews.movie_id ORDER BY movies.movie_name';
    pool.query(sql, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        const { rows } = result;
        res.json({
            messageg: 'success',
            data: rows,
        });
    });
});

// POST request to add a movie
app.post('/api/add-movie', ({ body }, res) => {
    const sql = 'INSERT INTO movies (movie_name) VALUES ($1)';
    const params = [body.movie_name];
    console.log(body);
    pool.query(sql, params, (err: Error, _result: QueryResult) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
        });
    });
});

// DELETE request to remove a movie
app.delete('/api/movie/:id', (req, res) => {
    const sql = 'DELETE FROM movies WHERE id = ($1)';
    const params = [req.params.id];

    pool.query(sql, params, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.rowCount) {
            res.json({
                message: 'Movie not found',
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.rowCount,
                id: req.params.id,
            });
        }
    });
});

// Update review
app.put('/api/review/:id', (req, res) => {
    const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
    const params = [req.body.review, req.params.id];
  
    pool.query(sql, params, (err: Error, result: QueryResult) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.rowCount) {
        res.json({
          message: 'Review not found',
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.rowCount,
        });
      }
    });
  });

// Default response for any other request
app.use((_req,  res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})