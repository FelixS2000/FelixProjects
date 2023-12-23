// Fetch voters on load
fetchVoters();

// Handle form submit
const form = document.getElementById('add-voter-form');
form.addEventListener('submit', addVoter);

// Fetch voters from API
async function fetchVoters() {
  const response = await fetch('/api/voters');
  const voters = await response.json();
  displayVoters(voters);
}

// Display voters in table
function displayVoters(voters) {
  const table = document.getElementById('voter-table');
  
  // Clear existing rows
  table.innerHTML = '';
  
  // Add new rows
  voters.forEach(voter => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${voter.cedula}</td>
      <td>${voter.nombre}</td>
      <td>${voter.genero}</td>
    `;
    table.appendChild(row);
  });
}

// Handle add voter form
async function addVoter(event) {
  event.preventDefault();

  const data = {
    cedula: document.getElementById('cedula').value,
    nombre: document.getElementById('nombre').value,
    genero: document.getElementById('genero').value
  };

  const response = await fetch('/api/voters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const newVoter = await response.json();
  displayVoters([newVoter]); // Display new voter

  form.reset(); // Reset form
}