// Get form elements
const form = document.getElementById("voterForm");

// Submit event handler
form.addEventListener('submit', (e) => {

  e.preventDefault();
  
  

  // Create form data
  const formData = new FormData();

  // Append form fields
  formData.append('name', nameInput.value); 
  formData.append('age', ageInput.value);
  formData.append('address', addressInput.value);
  formData.append('photo', photoInput.value);




  // XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Open request
  xhr.open('POST', 'add_voter.php');
  // Send data on completion
  xhr.onload = () => {
    if (xhr.status === 200) {
      alert(`Votre vote a bien été enregistré !`);
      window.location.href='index.html';
      } else {
        console.error(`Error: ${xhr.status}`);
        }
        };

  xhr.onerror = () => {
    // Error
    console.error('An error occurred while submitting the form!');
  };

  // Handle response 
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        // Success
      } else {
        // Handle error
      }
    }
  };

  // Send request 
xhr.send(formData);

});