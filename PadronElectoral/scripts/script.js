document.addEventListener('DOMContentLoaded', function () {
    let voterListContainer = document.getElementById('voter-list-container');
    const registrationForm = document.getElementById('registration-form');

    // Fetch voters from the API
    fetch('/api/voters')
        .then(response => response.json())
        .then(data => {
            // Render voter list
            data.forEach(voter => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${voter.nombre}</strong> -
                    Cédula: ${voter.cedula} -
                    Pasaporte: ${voter.pasaporte} -
                    ${voter.habilitado ? 'Habilitado para votar' : 'No habilitado para votar'}
                `;
                voterListContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching voters:', error));

    // Register a new voter
    window.registrarVotante = function () {
        const nombre = document.getElementById('nombre').value;
        const cedula = document.getElementById('cedula').value;
        const pasaporte = document.getElementById('pasaporte').value;
        const habilitado = document.getElementById('habilitado').checked;

        // Send data to the server
        fetch('/api/voters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, cedula, pasaporte, habilitado }),
        })
        .then(response => response.json())
        .then(data => {
            // Refresh the voter list after registration
            voterListContainer.innerHTML = '';
            data.forEach(voter => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${voter.nombre}</strong> -
                    Cédula: ${voter.cedula} -
                    Pasaporte: ${voter.pasaporte} -
                    ${voter.habilitado ? 'Habilitado para votar' : 'No habilitado para votar'}
                `;
                voterListContainer.appendChild(listItem);
            });

            // Clear the registration form
            registrationForm.reset();
        })
        .catch(error => console.error('Error registering voter:', error));
    };
});
