const db = require('../models/db');

class TutorRepository {

    getAll(callback) {
        db.query('SELECT * FROM tutors', callback);
    }

    create(name, subject, price, callback) {
        db.query(
            'INSERT INTO tutors(name,subject,price) VALUES(?,?,?)',
            [name, subject, price],
            callback
        );
    }
}

module.exports = new TutorRepository();