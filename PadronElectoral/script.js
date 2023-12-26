const settings = {
  "db": {
    "host": "127.0.0.1", 
    "user": "root",
    "password": "Felix1729!2020",
    "name": "electoral"
  }
};

const voterForm = document.getElementById('voterForm');
const resultDiv = document.getElementById('result');
const errorFooter = document.getElementById('error');

voterForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const formData = new FormData(voterForm);
  const name = formData.get('name');
  const age = formData.get('age');
  const gender = formData.get('gender');
  const address = formData.get('address');
  const photo = formData.get('photo');

  // Basic validation
  let errors = [];
  if (!name) errors.push('Name is required');
  if (!age) errors.push('Age is required');
  if (!gender) errors.push('Gender is required');
  if (!address) errors.push('Address is required');

  if (errors.length > 0) {
    errorFooter.textContent = errors.join(', ');
    return;
  }

  // Display result
  resultDiv.innerHTML = `
    <h3>Voter Information</h3>

    <p>Name: ${name}</p>
    <p>Age: ${age}</p>
    <p>Gender: ${gender}</p>
    <p>Address: ${address}</p>
  `;

});