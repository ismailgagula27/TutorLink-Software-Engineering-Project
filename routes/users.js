const express = require('express');
const router = express.Router();
const db = require('../models/db');

// REGISTER
router.post('/register', (req, res) => {

    const { name, email, password, role } = req.body;

    db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role],
        (err, result) => {

            if (err) {
                return res.status(500).send(err);
            }

            res.send('User registered');
        }
    );
});

// LOGIN
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (err, results) => {

            if (err) {
                return res.status(500).send(err);
            }

            if (results.length === 0) {
                return res.status(401).send('Invalid credentials');
            }

            res.json({
                message: 'Login successful',
                user: results[0]
            });
        }
    );
});

module.exports = router;