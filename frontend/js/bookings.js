const API_URL = "http://localhost:3000/bookings";

async function loadBookings() {

    const response = await fetch(API_URL);
    const bookings = await response.json();

    const list = document.getElementById("bookingList");

    list.innerHTML = "";

    bookings.forEach(booking => {

        const li = document.createElement("li");

        li.innerHTML =
            `Booking #${booking.id}
             | Student ${booking.student_id}
             | Tutor ${booking.tutor_id}
             | Slot ${booking.availability_id}
             | ${booking.status}`;

        list.appendChild(li);
    });
}

async function createBooking() {

    const student_id =
        document.getElementById("student_id").value;

    const tutor_id =
        document.getElementById("tutor_id").value;

    const availability_id =
        document.getElementById("availability_id").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            student_id,
            tutor_id,
            availability_id
        })
    });

    const message = await response.text();

    alert(message);

    loadBookings();
}

loadBookings();