// Import settings
import settings from './settings.json' 

// Get form element
const form = document.getElementById('voterForm');

// Form submit handler
form.addEventListener('submit', e => {

  // Prevent default submit
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);

  // AJAX request to add_voter.php
  fetch('add_voter.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    
    // Redirect to register on success
    window.location.href = 'register.php';

  })
  .catch(error => {
    console.error(error);
  });

});

// Database settings from settings.json
const db = settings.db;
const dbHost = db.host;
const dbUser = db.user;
const dbPass = db.password;
const dbName = db.name;