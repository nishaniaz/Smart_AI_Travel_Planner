document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {

            const response = await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            });

            const data = await response.json();

            if (data.success) {

                alert("Login successful! 🎉");

                // Save logged-in user details
                localStorage.setItem(
                    "travelverseUser",
                    JSON.stringify(data.user)
                );

                window.location.href = "/dashboard";

            } else {

                alert(data.message || "Invalid email or password.");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to server.");

        }

    });

});