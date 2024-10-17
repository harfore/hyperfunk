const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./index');

const router = express.Router();

module.exports = (pool) => {
    router.post('/register', async (req, res) => {
        const { email, username, password, handle, country } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                'INSERT INTO users (email, username, password, handle, country) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [email, username, hashedPassword, handle, country]
            );

            const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ user: result.rows[0], token });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Error creating user' });
        }
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
    return router;
}