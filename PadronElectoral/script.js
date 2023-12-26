// Select elements
const form = document.getElementById('voterForm');
const errorDiv = document.getElementById('error');

// Add submitted data div
const resultsDiv = document.createElement('div');
resultsDiv.id = 'results';
document.body.appendChild(resultsDiv);


// Form submit handler
form.addEventListener('submit', async (e) => {

  // Get form data
  const formData = new FormData(form);

  // Get gender value
  const gender = formData.get('gender');

  // Append gender to form data
  formData.append('gender', gender);

  // POST request to API endpoint
  fetch('/api/voters', {
    method: 'POST', 
    body: formData
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
    errorDiv.textContent = 'There was a problem saving the data.';
  });
});


async function displayResult(data) {

  resultsDiv.innerHTML = `
    <h2>Submitted Data:</h2>
    <p>
      Name: ${data.name}<br>
      Age: ${data.age}<br>
      Gender: ${data.gender}<br>
      Address: ${data.address}
    </p>
  `;

  // Display image
  const img = document.createElement('img');
  img.src = data.photo;
  resultsDiv.appendChild(img);
  displayResult(data);
}
