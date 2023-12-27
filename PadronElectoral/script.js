// Fetch settings
fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/settings.json')
  .then(response => response.json())
  .then(data => {

    // Get DB settings
    const db = data.db;

    // Get add voter URL
    const addVoterUrl = data.addVoterUrl;

    // Use DB settings and URL for form submission
    const formData = new FormData(voterForm);

    if (addVoterUrl) {
      // Construct the URL with GET parameters
      const urlWithParams = `${addVoterUrl}?name=${formData.get('name')}&age=${formData.get('age')}&gender=${formData.get('gender')}&address=${formData.get('address')}&photo=${formData.get('photo')}`;

      // Perform the GET request without a request body
      return fetch(urlWithParams, {
        method: 'GET',
      });
    } else {
      console.error('add_voter.php URL not defined in settings');
    }

  })
  .catch(error => {
    console.error('Error fetching settings', error);
  });

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

  <img src="${URL.createObjectURL(photo)}">

  <p>Name: ${name}</p>
  <p>Age: ${age}</p>
  <p>Gender: ${gender}</p>
  <p>Address: ${address}</p>
  `;
});



