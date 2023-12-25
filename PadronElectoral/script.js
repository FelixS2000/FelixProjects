// Get form and input elements
const form = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const ageInput = document.querySelector('input[name="age"]');
const addressInput = document.querySelector('input[name="address"]');
const photoInput = document.querySelector('input[name="photo"]');

// Add submit event listener 
form.addEventListener('submit', (e) => {

  // Prevent default form submit
  e.preventDefault();

  // Get values
  const name = nameInput.value;
  const age = ageInput.value;
  const address = addressInput.value;
  const photo = photoInput.files[0];

  // Create FormData object
  const formData = new FormData();
  formData.append('name', name);
  formData.append('age', age); 
  formData.append('address', address);
  formData.append('photo', photo);

  // Submit FormData object via XHR
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/register');
  xhr.onload = () => {
    // Redirect on success
    if (xhr.status === 200) {
      window.location.href = '/'; 
    }
  };

  xhr.send(formData);

});