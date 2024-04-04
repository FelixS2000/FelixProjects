function add() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const result = num1 + num2;
    document.getElementById("result").innerHTML = result;
  }
  
  function subtract() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const result = num1 - num2;
    document.getElementById("result").innerHTML = result;
  }
  
  function multiply() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const result = num1 * num2;
    document.getElementById("result").innerHTML = result;
  }
  
  function divide() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    // Check for division by zero
    if (num2 === 0) {
      document.getElementById("result").innerHTML = "Error: Cannot divide by zero";
      return;
    }
    const result = num1 / num2;
    document.getElementById("result").innerHTML = result;
  }
  
  // Update the date in the footer
  const today = new Date();
  const date = today.toLocaleDateString();
  document.getElementById("date").textContent = date;
  