xhr.send(formData);
// Get form elements
const form = document.querySelector('form');

// Submit event handler
form.addEventListener('submit', (e) => {

  e.preventDefault();
  
  // Create FormData
  const formData = new FormData(form);

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
        

  // Attach handlers 
  xhr.onload = () => {
    // Success
  };

  xhr.onerror = () => {
    // Error
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