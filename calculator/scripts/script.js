function add(){
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let result = Number(num1) + Number(num2);
    document.getElementById('result').innerHTML = result;
}

function subtract(){
  let num1 = document.getElementById('num1');
  let num2 = document.getElementById('num2');
  let result = Number(num1) - Number(num2);
  document.getElementById('result').innerHTML = result;
}

function multiply(){
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let result = Number(num1) * Number(num2);
    document.getElementById('result').innerHTML = result;
}

function divide(){
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let result = Number(num1) / Number(num2);
    document.getElementById('result').innerHTML = result;
}