document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("tripForm");
    const generateBtn = document.getElementById("generateBtn");

    if (!form) {
        return;
    }

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        // =========================
        // GET LOGGED-IN USER
        // =========================

        const user = JSON.parse(
            localStorage.getItem("travelverseUser")
        );

        if (!user) {
            alert("Please login first! 🔐");
            window.location.href = "/login";
            return;
        }


        const destination = document.getElementById("destination").value.trim();
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const budget = document.getElementById("budget").value;
        const travellers = document.getElementById("travellers").value;
        const tripType = document.getElementById("tripType").value;
        const transport = document.getElementById("transport").value;
        const hotel = document.getElementById("hotel").value;
        const food = document.getElementById("food").value;


        if (!destination || !startDate || !endDate || !budget) {

            alert("Please fill all required fields.");

            return;
        }


        if (new Date(endDate) < new Date(startDate)) {

            alert("End date must be after start date.");

            return;
        }


        generateBtn.innerText = "🤖 Generating AI Trip...";
        generateBtn.disabled = true;


        try {

            const response = await fetch("/generate-trip", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    // USER ID
                    user_id: user.id,

                    destination: destination,
                    startDate: startDate,
                    endDate: endDate,
                    budget: budget,
                    travellers: travellers,
                    tripType: tripType,
                    transport: transport,
                    hotel: hotel,
                    food: food

                })

            });


            const data = await response.json();


            if (!data.success) {

                alert(data.error || "AI generation failed.");

                generateBtn.innerText = "🤖 Generate AI Trip";
                generateBtn.disabled = false;

                return;
            }


            // =========================
            // SAVE TRIP DATA
            // =========================

            localStorage.setItem(
                "tripDestination",
                destination
            );

            localStorage.setItem(
                "tripStartDate",
                startDate
            );

            localStorage.setItem(
                "tripEndDate",
                endDate
            );

            localStorage.setItem(
                "tripBudget",
                budget
            );

            localStorage.setItem(
                "tripTravellers",
                travellers
            );

            localStorage.setItem(
                "tripType",
                tripType
            );

            localStorage.setItem(
                "tripTransport",
                transport
            );

            localStorage.setItem(
                "tripHotel",
                hotel
            );

            localStorage.setItem(
                "tripFood",
                food
            );

            localStorage.setItem(
                "aiTripResult",
                data.result
            );


            // =========================
            // OPEN RESULT PAGE
            // =========================

            window.location.href = "/trip-result";


        } catch (error) {

            console.error(error);

            alert(
                "Cannot connect to TravelVerse AI. Make sure Flask and Ollama are running."
            );

            generateBtn.innerText = "🤖 Generate AI Trip";
            generateBtn.disabled = false;

        }

    });

});