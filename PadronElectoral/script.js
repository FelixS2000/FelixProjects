// Select elements
const form = document.getElementById('voterForm');
const errorDiv = document.getElementById('error');

// Form submit handler
form.addEventListener('submit', (e) => {

  // Prevent default submit
  e.preventDefault();

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
