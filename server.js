const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const tutorRoutes = require('./routes/tutors');
app.use('/tutors', tutorRoutes);

const studentRoutes = require('./routes/students');
app.use('/students', studentRoutes);

const availabilityRoutes = require('./routes/availability');
app.use('/availability', availabilityRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/bookings', bookingRoutes);

const reviewRoutes = require('./routes/reviews');
app.use('/reviews', reviewRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});