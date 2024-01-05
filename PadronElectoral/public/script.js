document.addEventListener('DOMContentLoaded', async function () {
    // Fetch voters data from the API
    const response = await fetch('/api/voters');
    const voters = await response.json();
  
    // Display voters on the page
    const votersList = document.getElementById('voters-list');
    voters.forEach(voter => {
      const voterItem = document.createElement('div');
      voterItem.className = 'voter-item';
      voterItem.innerHTML = `<p>${voter.name} - ${voter.age} years old</p>`;
      votersList.appendChild(voterItem);
    });
  });
  