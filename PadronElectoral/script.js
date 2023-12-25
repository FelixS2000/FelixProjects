// Hardcoded DB settings
const db = {
  host: "localhost",
  user: "root",
  password: "Felix1729!2020",
  name: "electoral"
};

// Fetch settings
fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/settings.json')
.then(response => response.json())  
.then(data => {

  // Override if exists in JSON
  if(data.db) {
    db.host = data.db.host || db.host;
    db.user = data.db.user || db.user;
    db.password = data.db.password || db.password;
    db.name = data.db.name || db.name;
  }


  // Get form element
  const form = document.getElementById('voterForm');

  // Form submit handler
form.addEventListener('submit', e => {

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
})
});