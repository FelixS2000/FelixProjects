// Get form element
const form = document.getElementById('voterForm');

// Add submit event listener 
form.addEventListener('submit', (e) => {

  // Prevent default form submission
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const name = formData.get('name');
  const age = formData.get('age');
  const address = formData.get('address');

  // Send POST request to add_voter.php
  fetch('add_voter.php', {
    method: 'POST', 
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // Display response message
    alert(data);
  })
  .catch(error => {
    console.error(error);
  });

});