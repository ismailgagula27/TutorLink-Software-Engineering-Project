const express = require('express');
const router = express.Router();
const db = require('../models/db');

// CREATE BOOKING
router.post('/', (req, res) => {

    const {
        student_id,
        tutor_id,
        availability_id
    } = req.body;

    // Check if slot is already booked
    db.query(
        'SELECT * FROM bookings WHERE availability_id = ?',
        [availability_id],
        (err, results) => {

            if (err) return res.status(500).send(err);

            if (results.length > 0) {
                return res.status(400).send("Slot already booked");
            }

            db.query(
                'INSERT INTO bookings (student_id, tutor_id, availability_id, status) VALUES (?, ?, ?, ?)',
                [student_id, tutor_id, availability_id, 'Booked'],
                (err, result) => {

                    if (err) return res.status(500).send(err);

                    res.send("Booking created");
                }
            );
        }
    );
});

// GET ALL BOOKINGS
router.get('/', (req, res) => {

    db.query(
        'SELECT * FROM bookings',
        (err, results) => {

            if (err) return res.status(500).send(err);

            res.json(results);
        }
    );
});

module.exports = router;