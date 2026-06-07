const express = require('express');
const router = express.Router();
const db = require('../models/db');

// CREATE AVAILABILITY
router.post('/', (req, res) => {

    const {
        tutor_id,
        available_date,
        start_time,
        end_time
    } = req.body;

    db.query(
        'INSERT INTO availability (tutor_id, available_date, start_time, end_time) VALUES (?, ?, ?, ?)',
        [tutor_id, available_date, start_time, end_time],
        (err, result) => {

            if (err) return res.status(500).send(err);

            res.send("Availability added");
        }
    );
});

// GET ALL AVAILABILITY
router.get('/', (req, res) => {

    db.query(
        'SELECT * FROM availability',
        (err, results) => {

            if (err) return res.status(500).send(err);

            res.json(results);
        }
    );
});

module.exports = router;