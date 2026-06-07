const user =
    JSON.parse(
        localStorage.getItem("user")
    );

if (user) {

    const profileLink =
        document.getElementById("profileLink");

    const logoutLink =
        document.getElementById("logoutLink");

    const registerLink =
        document.getElementById("registerLink");

    const loginLink =
        document.getElementById("loginLink");

    const welcomeUser =
        document.getElementById("welcomeUser");

    if (profileLink)
        profileLink.style.display = "inline";

    if (logoutLink)
        logoutLink.style.display = "inline";

    if (registerLink)
        registerLink.style.display = "none";

    if (loginLink)
        loginLink.style.display = "none";

    if (welcomeUser)
        welcomeUser.innerText =
            user.name;
}

function logout() {

    localStorage.removeItem("user");

    window.location.href =
        "index.html";
}