document.addEventListener("DOMContentLoaded", () => {
    // Fetch voters from the server and populate the table
    fetch("/api/getVoters")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch voters: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => console.error("Error fetching voters:", error));

    // Handle form submission
    const form = document.getElementById("voterForm");
    form.addEventListener("submit", event => {
        event.preventDefault();
        addVoter();
    });
});

function populateTable(voters) {
    const tableBody = document.querySelector("#voterTable tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Add table rows
    voters.forEach(voter => {
        const row = tableBody.insertRow();
        Object.values(voter).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}

function addVoter() {
    const form = document.getElementById("voterForm");
    const formData = new FormData(form);

    fetch("/api/addVoter", {
        method: "POST",
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to add voter: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Refresh the table with the updated data
        populateTable(data);
    })
    .catch(error => console.error("Error adding voter:", error));
}
