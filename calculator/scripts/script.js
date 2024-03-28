function add() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let result = Number(num1) + Number(num2);
    document.getElementById("result").innerHTML = result;
  }
  
  function subtract() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let result = Number(num1) - Number(num2);
    document.getElementById("result").innerHTML = result;
  }
  
  function multiply() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let result = Number(num1) * Number(num2);
    document.getElementById("result").innerHTML = result;
  }
  
  function divide() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    if (num2 == 0) {
      alert("Cannot divide by zero");
      return;
    }
    let result = Number(num1) / Number(num2);
    document.getElementById("result").innerHTML = result;
  }