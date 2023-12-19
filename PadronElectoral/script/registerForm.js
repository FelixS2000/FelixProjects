document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/register', {
    method: 'POST',
    body: formData
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
});