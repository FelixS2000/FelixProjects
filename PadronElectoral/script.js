document.addEventListener('DOMContentLoaded', function () {
  const voterForm = document.getElementById('voterForm');
  const resultDiv = document.getElementById('result');
  const errorFooter = document.getElementById('error');

  voterForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(voterForm);
    const name = formData.get('name');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const address = formData.get('address');
    const photo = formData.get('photo');

    // Basic validation
    let errors = [];
    if (!name) errors.push('Name is required');
    if (!age) errors.push('Age is required');
    if (!gender) errors.push('Gender is required');
    if (!address) errors.push('Address is required');

    if (errors.length > 0) {
      errorFooter.textContent = errors.join(', ');
      return;
    }

    // Display result
    resultDiv.innerHTML = `
      <h3>Voter Information</h3>
      <img src="${URL.createObjectURL(photo)}">
      <p>Name: ${name}</p>
      <p>Age: ${age}</p>
      <p>Gender: ${gender}</p>
      <p>Address: ${address}</p>
    `;

    // Perform the GET request to add the voter
    const url = `https://felixc2000.github.io/FelixProjects/PadronElectoral/add_voter.php?name=${name}&age=${age}&gender=${gender}&address=${address}&photo=${photo}`;
   
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add voter');
        }
        return response.text();
      })
      .then(responseText => {
        // Display success message or handle it as needed
        console.log(responseText);
      })
      .catch(error => {
        console.error('Error adding voter:', error.message || error);
      });
  });

  // Fetch voter data from the specified URL in settings
  fetch('https://felixc2000.github.io/FelixProjects/PadronElectoral/settings.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }
      return response.json();
    })
    .then(data => {
      const displayVoterUrl = data.displayVoterUrl;

      if (displayVoterUrl) {
        // Perform the GET request for voter data
        return fetch(displayVoterUrl);
      } else {
        console.error('display_voter.php URL not defined in settings');
        throw new Error('display_voter.php URL not defined in settings');
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch voter data. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(voters => {
      // Display voter data in the result div
      if (voters && voters.length > 0) {
        resultDiv.innerHTML += '<h3>Voter Information</h3>';
        voters.forEach(voter => {
          resultDiv.innerHTML += `
            <img src="${voter.photo}">
            <p>Name: ${voter.name}</p>
            <p>Age: ${voter.age}</p>
            <p>Gender: ${voter.gender}</p>
            <p>Address: ${voter.address}</p>
          `;
        });
      } else {
        resultDiv.innerHTML += 'No voters found';
      }
    })
    .catch(error => {
      console.error('Error fetching voter data:', error.message || error);
    });
});
