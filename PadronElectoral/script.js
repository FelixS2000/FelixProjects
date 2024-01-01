// Prevent default form submission
document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Validate and sanitize input
    var name = document.getElementById("name").value.trim();
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value.trim();
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var photo = document.getElementById("photo").files[0];
  
    var errorMessage = "";
  
    if (name === "") {
      errorMessage += "Please enter your name.\n";
    }
  
    if (age === "") {
      errorMessage += "Please enter your age.\n";
    } else if (isNaN(age) || age < 18) {
      errorMessage += "Please enter a valid age (18 or above).\n";
    }
  
    if (address === "") {
      errorMessage += "Please enter your address.\n";
    }
  
    if (!gender) {
      errorMessage += "Please select your gender.\n";
    }
  
    if (!photo) {
      errorMessage += "Please choose a photo.\n";
    }
  
    if (errorMessage !== "") {
      alert(errorMessage);
      return; // Stop further execution if validation fails
    }
  
    // Show loading indicator
    document.getElementById("voter-data").innerHTML = "<p>Loading...</p>";
  
    // Submit form data using AJAX
    var formData = new FormData(this);
    fetch("process.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("voter-data").innerHTML = data; // Display response from PHP
    })
    .catch(error => {
      console.error(error);
      // Handle errors gracefully, e.g., display an error message
    });
  });
  