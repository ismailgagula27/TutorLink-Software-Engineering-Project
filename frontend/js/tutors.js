const API_URL = "http://localhost:3000/tutors";

async function loadTutors() {

    const response = await fetch(API_URL);
    const tutors = await response.json();

    const list = document.getElementById("tutorList");

    list.innerHTML = "";

    tutors.forEach(tutor => {

        const li = document.createElement("div");
        li.className = "card";

        li.innerHTML =
            `${tutor.name} - ${tutor.subject} - $${tutor.price}`;

        list.appendChild(li);
    });
}

async function addTutor() {

    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const price = document.getElementById("price").value;

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

loadTutors();