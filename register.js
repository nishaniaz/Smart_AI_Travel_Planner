document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await fetch("/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })

            });

            const data = await response.json();

            if (data.success) {

                alert("Registration successful! 🎉");

                window.location.href = "/login";

            } else {

                alert(data.message || "Registration failed.");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to server.");

        }

    });

});