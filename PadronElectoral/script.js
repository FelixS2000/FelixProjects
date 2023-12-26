// Select elements  
const form = document.getElementById('voterForm');
const resultDiv = document.getElementById('result');

// Form submit handler
form.addEventListener('submit', async (e) => {

  e.preventDefault();

  // Get form data
  const formData = new FormData(form);

  // Submit form data
  const response = await fetch('/api/voters', {
    method: 'POST',
    body: formData
  });

  // Handle response
  if(response.ok) {
    const data = await response.json();
    displayResult(data); 
  } else {
    console.error('Error submitting form');
  }

});

// Display result  
function displayResult(data) {

  resultDiv.innerHTML = `
    <h3>Submitted Data:</h3>
    <p>
      Name: ${data.name}<br>
      Age: ${data.age}<br>
      Gender: ${data.gender}<br>
      Address: ${data.address} 
    </p>
  `;

  const img = document.createElement('img');
  img.src = data.photo;
  resultDiv.appendChild(img);

}
