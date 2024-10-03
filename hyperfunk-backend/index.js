const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'MOTHERBOARD',
    password: 'public',
    port: 5433,
});

app.use(express.json());

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