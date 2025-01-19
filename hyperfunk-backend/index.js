const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const app = express();
const port = 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.get('/api/profile', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const result = await pool.query('SELECT handle, country, pronouns, bio FROM users WHERE id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/profile', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { handle, country, pronouns, password, bio } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        await pool.query(
            'UPDATE users SET handle = $1, country = $2, pronouns = $3, password = $4, bio = $5 WHERE id = $6',
            [handle, country, pronouns, password, bio, userId]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const auth = require('./auth')(pool);
app.use('/api', auth);

app.get('/api/tours', async (req, res) => {
    const { name } = req.query;
    try {
        const result = await pool.query('SELECT * FROM tours WHERE name = $1', [name]);
        res.status(200).json(result.rows[0]); // Return the first matching tour
    } catch (error) {
        console.error('Error fetching tour:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/tours/check', async (req, res) => {
    const { name } = req.body;

    try {
        const existingTour = await pool.query(
            'SELECT * FROM tours WHERE name = $1',
            [name]
        );

        if (existingTour.rows.length > 0) {
            return res.status(409).json({ message: 'Tour already exists with this name.' });
        }
        return res.status(200).json({ message: 'No existing tour found.' });
    } catch (error) {
        console.error('Error checking for existing tour:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/tours', async (req, res) => {
    const { name, artist_id, number_of_dates, start_date, end_date, description, live_album, concert_film } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tours (name, artist_id, number_of_dates, start_date, end_date, description, live_album, concert_film) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [name, artist_id, number_of_dates, start_date, end_date, description, live_album, concert_film]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding tour:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/tours/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tourResult = await pool.query('SELECT * FROM tours WHERE id = $1', [id]);

        if (tourResult.rows.length === 0) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Fetch concerts linked to this tour
        const concertResult = await pool.query('SELECT * FROM concerts WHERE tour_id = $1', [id]);
        const tourData = {
            ...tourResult.rows[0],
            concerts: concertResult.rows,
        };

        res.status(200).json(tourData);
    } catch (error) {
        console.error('Error fetching tour details:', error);
        res.status(500).send('Server error');
    }
});


// check for existing concerts by date
app.post('/api/concerts/check', async (req, res) => {
    const { concert_date, venue } = req.body;

    try {
        const existingConcert = await pool.query(
            'SELECT * FROM concerts WHERE concert_date = $1 AND venue = $2',
            [concert_date, venue]
        );

        if (existingConcert.rows.length > 0) {
            return res.status(409).json({ message: 'Concert already exists for this date and venue.' });
        }
        return res.status(200).json({ message: 'No existing concert found.' });
    } catch (error) {
        console.error('Error checking for existing concert:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/concerts', async (req, res) => {
    const { id, artist, venue, concert_date, concert_picture_1, concert_picture_2, concert_picture_3, something_special, user_count, review, review_count } = req.body;

    try {
        // First, check for existing concerts
        const existingConcert = await pool.query(
            'SELECT * FROM concerts WHERE concert_date = $1 AND venue = $2 AND artist = $3',
            [concert_date, venue, artist]
        );

        if (existingConcert.rows.length > 0) {
            return res.status(409).json({ message: 'Concert already exists for this date and venue.' });
        }

        // If no existing concert, proceed to insert
        const result = await pool.query(
            'INSERT INTO concerts (artist, venue, concert_date, concert_picture_1, concert_picture_2, concert_picture_3, something_special, user_count, review, review_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [artist, venue, concert_date, concert_picture_1, concert_picture_2, concert_picture_3, something_special, user_count, review, review_count]
        );

        res.status(201).json(result.rows[0]); // Return the added concert

    } catch (error) {
        console.error('Error adding concert:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/concerts', async (req, res) => {
    console.log("Received request to add concert:", req.body);
    try {
        const result = await pool.query('SELECT * FROM concerts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching concerts:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/popular', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tours WHERE favorite = true');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching tours:', error.message, error.stack);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = pool;