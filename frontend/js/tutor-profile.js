const tutorId =
    localStorage.getItem("selectedTutor");

const currentUser =
    JSON.parse(
        localStorage.getItem("user")
    );

Promise.all([
    fetch("http://localhost:3000/tutors")
        .then(res => res.json()),

    fetch("http://localhost:3000/reviews")
        .then(res => res.json()),

    fetch("http://localhost:3000/availability")
        .then(res => res.json())
])

.then(([tutors, reviews, availability]) => {

    const tutor =
        tutors.find(
            t => t.id == tutorId
        );

    if (!tutor) {

        document.getElementById("profile")
            .innerHTML =
            "<h2>Tutor not found</h2>";

        return;
    }

    const tutorReviews =
        reviews.filter(
            review =>
            review.tutor_id == tutorId
        );

    let averageRating = "0.0";

    if (tutorReviews.length > 0) {

        const total =
            tutorReviews.reduce(
                (sum, review) =>
                    sum + Number(review.rating),
                0
            );

        averageRating =
            (total /
             tutorReviews.length)
            .toFixed(1);
    }

    const tutorSlots =
        availability.filter(
            slot =>
            slot.tutor_id == tutorId
        );

    let reviewsHTML = "";

    tutorReviews.forEach(review => {

        reviewsHTML += `
            <div class="review-card">

                <p>
                     ${review.rating}/5
                </p>

                <p>
                    ${review.comment}
                </p>

            </div>
        `;
    });

    let slotsHTML = "";

    tutorSlots.forEach(slot => {

        slotsHTML += `

    <div class="slot-card">

        <p>
             ${slot.available_date}
        </p>

        <p>
             ${slot.start_time}
            -
            ${slot.end_time}
        </p>

        ${
            currentUser &&
            currentUser.role === "student"
            ? `
            <button
                onclick="bookSlot(
                    ${tutor.id},
                    ${slot.id}
                )">
                Book This Slot
            </button>
            `
            : ""
        }

    </div>

`;
    });

    document.getElementById("profile")
        .innerHTML = `

        <div class="profile-header">

            <h2>${tutor.name}</h2>

            <div class="profile-info">

                <p>
                    <strong>Subject:</strong>
                    ${tutor.subject}
                </p>

                <p>
                    <strong>Price:</strong>
                    $${tutor.price}/hour
                </p>

            </div>

            <div class="profile-badge">
                Tutor
            </div>

            <p class="rating">
                 ${averageRating}
            </p>

            ${currentUser &&
            currentUser.role === "student"
            ? `
            <button
    class="student-only"
    onclick="bookTutor(${tutor.id})">
    Book Session
</button>
            `
            : ""}

        </div>

        <h3 class="section-title">
            Available Time Slots
        </h3>

        ${slotsHTML || "<p>No available slots</p>"}

        <h3 class="section-title">
            Reviews
        </h3>

        ${reviewsHTML || "<p>No reviews yet</p>"}

        `;
})

.catch(error => {

    console.error(error);

    document.getElementById("profile")
        .innerHTML =
        "<h2>Error loading tutor profile</h2>";
});

function bookTutor(tutorId) {

    localStorage.setItem(
        "selectedTutorBooking",
        tutorId
    );

    window.location.href =
        "bookings.html";
}

function bookSlot(
    tutorId,
    availabilityId
) {

    localStorage.setItem(
        "selectedTutorBooking",
        tutorId
    );

    localStorage.setItem(
        "selectedAvailabilityBooking",
        availabilityId
    );

    window.location.href =
        "bookings.html";
}