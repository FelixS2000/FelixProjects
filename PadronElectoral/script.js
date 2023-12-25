// Get form and input elements
const form = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const ageInput = document.querySelector('input[name="age"]');
const addressInput = document.querySelector('input[name="address"]');
const photoInput = document.querySelector('input[name="photo"]');

// Add submit event listener 
form.addEventListener("submit", (e) => {
  // Prevent default form submit
  e.preventDefault();

  // Get values
  const name = nameInput.value;
  const age = ageInput.value;
  const address = addressInput.value;
  const photo = photoInput.files[0];

  // Create FormData object
  const formData = new FormData();
  formData.append("name", name);
  formData.append("age", age);
  formData.append("address", address);
  formData.append("photo", photo);

  // Declare xhr globally
  const xhr = new XMLHttpRequest();


  // Get form elements
  const form = document.querySelector('form');

  // Submit event handler
  form.addEventListener('submit', (e) => {

  // Prevent default submit
  e.preventDefault();

  // Create FormData
  const formData = new FormData();

  // Open xhr request
  xhr.open('POST', '/add_voter.php');

  // Set content type header
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');

  // Handle load
  xhr.onload = () => {
    if(xhr.status === 200){
      window.location.href = '/register.php';
    }
  };

  // Handle errors
  xhr.onerror = () => {
    console.error('Request Failed');
  };

  if(xhr.status !== 200){
    console.error('Error', xhr.statusText);
  }

  // Send request
  xhr.send(formData);
  });
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      // Success
    }
  };
}); 