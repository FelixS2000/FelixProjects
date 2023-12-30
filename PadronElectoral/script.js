
let votersList = [];

const addVoterForm = document.getElementById('addVoterForm');
addVoterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const voterName = document.getElementById('voterName').value;
    const voterAge = document.getElementById('voterAge').value;
    const voterID = document.getElementById('voterID').value;

    const newVoter = {
        name: voterName,
        age: voterAge,
        id: voterID,
    };

    votersList.push(newVoter);
    renderVotersList();
    addVoterForm.reset();
});

function renderVotersList() {
    const votersListElement = document.getElementById('votersList');
    votersListElement.innerHTML = '';

    votersList.forEach((voter, index) => {
        const voterElement = document.createElement('div');
        voterElement.innerHTML = `
            <strong>${voter.name}</strong>
            <br>
            Edad: ${voter.age}
            <br>
            Identificacion: ${voter.id}
            <br>
            <button onclick="removeVoter(${index})">Eliminar</button>
            <hr>
        `;
        votersListElement.appendChild(voterElement);
    });
}

function removeVoter(index) {
    votersList.splice(index, 1);
    renderVotersList();
}
