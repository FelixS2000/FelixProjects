// displayForm.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the server and update the content
    fetch('http://localhost:3000/getFormData') // Assuming you have an endpoint to get form data
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the title
            document.getElementById('mainTitle').innerHTML = data.title;

            // Update the content
            document.getElementById('mainContent').innerHTML = data.content;
        })
        .catch(error => console.error('Error:', error));
});
