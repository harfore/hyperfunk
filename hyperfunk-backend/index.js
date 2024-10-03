const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'remih',
    host: 'localhost',
    database: 'concerts_db',
    password: 'public',
    port: 5433,
});

app.get('/api/artists', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM artists');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
