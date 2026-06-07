const API_URL = "http://localhost:3000/students";

async function loadStudents() {

    const response = await fetch(API_URL);
    const students = await response.json();

    const list = document.getElementById("studentList");

    list.innerHTML = "";

    students.forEach(student => {

        const li = document.createElement("li");

        li.innerHTML =
            `${student.name} - ${student.email}`;

        list.appendChild(li);
    });
}

async function addStudent() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email
        })
    });

    loadStudents();
}

loadStudents();