const API_URL = "http://localhost:3000/reviews";

async function loadReviews() {

    const response = await fetch(API_URL);
    const reviews = await response.json();

    const list = document.getElementById("reviewList");

    list.innerHTML = "";

    reviews.forEach(review => {

        const li = document.createElement("li");

        li.innerHTML =
            `Student ${review.student_id}
             | Tutor ${review.tutor_id}
             | Rating: ${review.rating}/5
             | ${review.comment}`;

        list.appendChild(li);
    });
}

async function addReview() {

    const student_id =
        document.getElementById("student_id").value;

    const tutor_id =
        document.getElementById("tutor_id").value;

    const rating =
        document.getElementById("rating").value;

    const comment =
        document.getElementById("comment").value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            student_id,
            tutor_id,
            rating,
            comment
        })
    });

    const message = await response.text();

    alert(message);

    loadReviews();
}

loadReviews();