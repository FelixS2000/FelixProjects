// script.js

// Settings
const db = {
  host: "127.0.0.1",
  user: "root",
  password: "Felix1729!2020",  
  name: "electoral"
}

// Get form element
const form = document.getElementById('voterForm');

// Form submit handler
form.addEventListener('submit', e => {

  // Prevent default submit
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);

  // AJAX request
  fetch('add_voter.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    
    // Redirect on success 
    window.location.href = 'register.php';

  })
  .catch(error => {
    console.error(error);
  });

});

// Access settings
const dbHost = db.host;
const dbUser = db.user;
const dbPass = db.password;
const dbName = db.name;