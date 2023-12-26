// script.js

// Define display result function
function displayResult(data) {

  // Get result div
  const resultDiv = document.getElementById('result');
  
  // Display data
  resultDiv.innerHTML = `
    <h2>Submitted Data:</h2>
    <p>
      Name: ${data.name}<br>
      Age: ${data.age}<br>
      Gender: ${data.gender}<br>
      Address: ${data.address}
    </p>
  `;

  // Display image
  const img = document.createElement('img');
  img.src = data.photo;
  resultDiv.appendChild(img);

}

// Form submit handler
form.addEventListener('submit', async (e) => {

  // Submit logic...

  const data = await response.json();

  displayResult(data);

});
