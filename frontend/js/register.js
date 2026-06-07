async function registerUser() {

    const name =
        document.getElementById('name').value;

    const email =
        document.getElementById('email').value;

    const password =
        document.getElementById('password').value;

    const role =
        document.getElementById('role').value;

    const response = await fetch(
        'http://localhost:3000/users/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        }
    );

    const message = await response.text();

    alert(message);

    if (response.ok) {
        window.location.href = 'login.html';
    }
}