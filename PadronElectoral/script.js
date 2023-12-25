// Get form element 
const formElement = document.getElementById('voterForm');

// Add submit event listener
formElement.addEventListener('submit', (e) => {

  // Prevent default submission
  e.preventDefault();

  // Get form data
  const formData = new FormData(formElement);

  // Append form data to body
  const body = new URLSearchParams();
  body.append('name', formData.get('name'));
  body.append('age', formData.get('age'));
  body.append('address', formData.get('address'));

  // Send POST request
  fetch('add_voter.php', {
    method: 'POST',
    body: body
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
  })
  .catch(error => {
    console.error(error);
  });

});