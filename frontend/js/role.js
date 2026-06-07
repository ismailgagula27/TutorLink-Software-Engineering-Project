const currentUser =
    JSON.parse(
        localStorage.getItem("user")
    );

if (currentUser) {

    if (currentUser.role === "student") {

        document
            .querySelectorAll(".tutor-only")
            .forEach(element => {

                element.style.display =
                    "none";
            });
    }

    if (currentUser.role === "tutor") {

        document
            .querySelectorAll(".student-only")
            .forEach(element => {

                element.style.display =
                    "none";
            });
    }
}