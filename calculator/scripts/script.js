function add(){
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let result = Number(num1) + Number(num2);
    document.getElementById('result').innerHTML = result;
    if (result % 2 == 0){
        document.getElementById('result').style.color = "green";
    }
    else{
        document.getElementById('result').style.color = "red";
    }
}

function subtract(){
  let num1 = document.getElementById('num1');
  let num2 = document.getElementById('num2');
  let result = Number(num1) - Number(num2);
  document.getElementById('result').innerHTML = result;
  if (result % 2 == 0){
      document.getElementById('result').style.color = "green";
  }
  else{
      document.getElementById('result').style.color = "red";
  }
}

function multiply(){
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let result = Number(num1) * Number(num2);
    document.getElementById('result').innerHTML = result;
    if (result % 2 == 0){
        document.getElementById('result').style.color = "green";
    }
    else{
        document.getElementById('result').style.color = "red";
    }
}

function divide(){
    let num1 = document.getElementById('num1');
    let num2 = document.getElementById('num2');
    let result = Number(num1) / Number(num2);
    document.getElementById('result').innerHTML = result;
    if (result % 2 == 0){
        document.getElementById('result').style.color = "green";
    }
    else {
       alert("Error! Division by zero is not allowed."); 
       return false;
    }
}

function date(){
    let date = new Date();
    let fullDate = new Date(date.getFullYear(), date.getMonth()+1, date.getDate());
    document.getElementById("date").innerHTML = fullDate;
}