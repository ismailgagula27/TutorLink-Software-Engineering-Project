const user =
    JSON.parse(
        localStorage.getItem('user')
    );

if (!user) {

    window.location.href =
        'login.html';
}

document.getElementById('userName')
    .innerText = user.name;

document.getElementById('userEmail')
    .innerText = user.email;

document.getElementById('userRole')
    .innerText = 'Role: ' + user.role;

function logout() {

    localStorage.removeItem('user');

    window.location.href =
        'login.html';
}