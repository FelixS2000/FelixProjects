// Fetch settings
async function fetchSettings() {
  const response = await fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/settings.json');
  return response.json();  
}

// Handle form submit
async function handleSubmit(event) {

  event.preventDefault();
  
  const form = event.target;
  const data = new FormData(form);

  try {
    const response = await fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/add_voter.php', {
      method: 'POST',
      body: data
    });

    if(!response.ok) {
      throw new Error('Request failed');
    }
    
    window.location.href = 'https://felixc2000.github.io/FelixProjects/PadronElectoral/register.php';

  } catch(error) {
    document.getElementById('error').textContent = error;
  }

}

// Main
async function main() {

  const settings = await fetchSettings();

  // Override DB settings
  db.host = settings.db.host; 
  db.user = settings.db.user;
  db.name = settings.db.name;
  db.age = settings.db.age;
  db.address = settings.db.address;

  const form = document.getElementById('voterForm');
  form.addEventListener('submit', handleSubmit);

}

main();
