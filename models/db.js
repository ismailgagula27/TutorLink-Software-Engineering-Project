const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tutor_link'
});

db.connect(err => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("Connected to DB");
  }
});

module.exports = db;