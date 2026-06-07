const express = require('express');
const router = express.Router();
const db = require('../models/db');

// CREATE REVIEW
router.post('/', (req, res) => {

    const {
        student_id,
        tutor_id,
        rating,
        comment
    } = req.body;

    db.query(
        'INSERT INTO reviews (student_id, tutor_id, rating, comment) VALUES (?, ?, ?, ?)',
        [student_id, tutor_id, rating, comment],
        (err, result) => {

            if (err) return res.status(500).send(err);

            res.send("Review created");
        }
    );
});

// GET ALL REVIEWS
router.get('/', (req, res) => {

    db.query(
        'SELECT * FROM reviews',
        (err, results) => {

            if (err) return res.status(500).send(err);

            res.json(results);
        }
    );
});

module.exports = router;