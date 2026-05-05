const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const tutorRoutes = require('./routes/tutors');
app.use('/tutors', tutorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});