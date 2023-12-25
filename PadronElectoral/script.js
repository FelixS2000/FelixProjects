// script.js

const form = document.getElementById('registration-form');
const table = document.getElementById('voter-table');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value;
  const age = form.age.value;
  const address = form.address.value;
  const photo = form.photo.files[0];

  registerVoter(name, age, address, photo);
});

async function registerVoter(name, age, address, photo) {
  // Send registration to server
  const response = await fetch('/register', {
    method: 'POST',
    body: JSON.stringify({
      name,
      age,
      address,
      photo
    })
  });

  // Add new row to table
  const voter = await response.json();
  addTableRow(voter);
}

function addTableRow(voter) {
  const row = document.createElement('tr');

  const photoCell = document.createElement('td');
  const photoImg = document.createElement('img');
  photoImg.src = voter.photo;
  photoCell.appendChild(photoImg);

  const nameCell = document.createElement('td');
  nameCell.textContent = voter.name;

  const ageCell = document.createElement('td');
  ageCell.textContent = voter.age;

  const addressCell = document.createElement('td');
  addressCell.textContent = voter.address;

  row.appendChild(photoCell);
  row.appendChild(nameCell);
  row.appendChild(ageCell);
  row.appendChild(addressCell);

  table.appendChild(row);
}