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

app.get('/concerts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM concerts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching concerts:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = pool;