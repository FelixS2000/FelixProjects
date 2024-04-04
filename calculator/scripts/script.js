function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function calculate() {
  const expression = document.getElementById("display").value;
  if (expression === '') {
      document.getElementById("result").innerHTML = "Error: Expression is empty";
      return;
  }
  try {
      const result = eval(expression);
      document.getElementById("result").innerHTML = result;
  } catch (error) {
      document.getElementById("result").innerHTML = "Error: Invalid expression";
  }
}

// Update the date in the footer
const today = new Date();
const date = today.toLocaleDateString();
document.getElementById("date").textContent = date;
