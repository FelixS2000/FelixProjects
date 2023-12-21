document.addEventListener("DOMContentLoaded", () => {
    // Fetch voters from local storage and populate the table
    const storedVoters = getStoredVoters();
    populateTable(storedVoters);

    // Handle form submission
    const form = document.getElementById("voterForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        addVoter();
    });
});

function populateTable(voters) {
    const tableBody = document.querySelector("#voterTable tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Add table rows
    voters.forEach((voter) => {
        const row = tableBody.insertRow();
        Object.values(voter).forEach((value) => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}

function addVoter() {
    const form = document.getElementById("voterForm");
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const voter = {};
    formData.forEach((value, key) => {
        voter[key] = value;
    });

    // Add the new voter to local storage
    const storedVoters = getStoredVoters();
    storedVoters.push(voter);
    localStorage.setItem("voters", JSON.stringify(storedVoters));

    // Refresh the table with the updated data
    populateTable(storedVoters);

    // Reset the form
    form.reset();
}

function getStoredVoters() {
    const storedVotersJSON = localStorage.getItem("voters");
    return storedVotersJSON ? JSON.parse(storedVotersJSON) : [];
}
