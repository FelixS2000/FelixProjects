document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(event.target);

    // Update the URL to the correct server endpoint
    fetch('http://localhost:3000/register', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
});
