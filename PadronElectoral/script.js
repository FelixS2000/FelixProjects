// script.js
document.getElementById('addVoterForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  fetch('add_voter.php', {
      method: 'POST',
      body: formData
  })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
});

fetch('display_voter.php')
  .then(response => response.json())
  .then(data => {
      const votersList = document.getElementById('votersList');
      data.forEach(voter => {
          const listItem = document.createElement('p');
          listItem.textContent = `${voter.name} - ${voter.age} años - ${voter.voter_id}`;
          votersList.appendChild(listItem);
      });
  })
  .catch(error => console.error(error));