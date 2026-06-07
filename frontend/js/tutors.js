const API_URL = "http://localhost:3000/tutors";

async function loadTutors() {

    const response = await fetch(API_URL);
    const tutors = await response.json();

    renderTutors(tutors);
}

function renderTutors(tutors) {

    const list = document.getElementById("tutorList");

    list.innerHTML = "";

    tutors.forEach(tutor => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${tutor.name}</h3>

            <p>
                Subject: ${tutor.subject}
            </p>

            <p>
                Price: $${tutor.price}/hour
            </p>

            <button
                onclick="viewProfile(${tutor.id})">
                View Profile
            </button>
        `;

        list.appendChild(card);
    });
}

async function addTutor() {

    const name =
        document.getElementById("name").value;

    const subject =
        document.getElementById("subject").value;

    const price =
        document.getElementById("price").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            subject,
            price
        })
    });

    loadTutors();
}

async function searchTutors() {

    const subject =
        document.getElementById("searchSubject")
        .value
        .toLowerCase();

    const response =
        await fetch(API_URL);

    const tutors =
        await response.json();

    const filtered =
        tutors.filter(tutor =>
            tutor.subject
                .toLowerCase()
                .includes(subject)
        );

    renderTutors(filtered);
}

async function filterPrice() {

    const maxPrice =
        Number(
            document.getElementById("maxPrice")
            .value
        );

    const response =
        await fetch(API_URL);

    const tutors =
        await response.json();

    const filtered =
        tutors.filter(tutor =>
            Number(tutor.price) <= maxPrice
        );

    renderTutors(filtered);
}

function viewProfile(id) {

    localStorage.setItem(
        "selectedTutor",
        id
    );

    window.location.href =
        "profile-tutor.html";
}

loadTutors();