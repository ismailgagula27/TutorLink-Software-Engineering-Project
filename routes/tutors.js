const express = require('express');
const router = express.Router();
const db = require('../models/db');

// CREATE
router.post('/', (req, res) => {
  const { name, subject, price } = req.body;
  db.query(
    'INSERT INTO tutors (name, subject, price) VALUES (?, ?, ?)',
    [name, subject, price],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Tutor created");
    }
  );
});

// READ
router.get('/', (req, res) => {
  db.query('SELECT * FROM tutors', (err, results) => {
    if (err) return res.send(err);
    res.json(results);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { name, subject, price } = req.body;
  db.query(
    'UPDATE tutors SET name=?, subject=?, price=? WHERE id=?',
    [name, subject, price, req.params.id],
    (err) => {
      if (err) return res.send(err);
      res.send("Tutor updated");
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tutors WHERE id=?', [req.params.id], (err) => {
    if (err) return res.send(err);
    res.send("Tutor deleted");
  });
});

module.exports = router;