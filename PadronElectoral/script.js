// Get form element
const form = document.getElementById('voterForm');




// Get form element
const form = document.getElementById('voterForm');

// Get name input element 
const nameInput = form.elements.name;
const ageInput = form.elements.age;
const addressInput = form.elements.address;
const photoInput = form.elements.photo;

// Add submit event listener
form.addEventListener("submit", (e) => {
  // Prevent default submission
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);

  // Get name value
  const name = nameInput.value;
  const age = ageInput.value;
  const address = addressInput.value;
  const photo = photoInput.value;

  // Send post to the database
  fetch("register.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.log("Error:", error))
    .then((result) => {
      if (!result) {
        alert("Registration Failed");
      } else {
        alert(`Welcome ${result}`);
        window.location.href = "index.html";
      }
    });
});
