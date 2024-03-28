//function for the calculator using id
function add(n1, n2) {
  let s1 = document.getElementById(n1);
  let s2 = document.getElementById(n2);
  let result = Number(s1.value) + Number(s2.value);
  let displayResult = document.getElementById('result');
  displayResult.innerHTML = "=";
  displayResult.style.color = 'green';
  setTimeout(() => {
    displayResult.innerHTML = result;
  }, 500);
}

function substract(n1, n2) {
  let r1 = document.getElementById(n1);
  let r2 = document.getElementById(n2);
  let result = Number(r1.value) - Number(r2.value);
  let displayResult = document.getElementById('result');
  displayResult.innerHTML = "=";
  displayResult.style.color = 'green';
  setTimeout(() => {
    displayResult.innerHTML = result;
  }, 500);
}

function multiply(n1, n2) {
    let m1 = document.getElementById(n1);
    let m2 = document.getElementById(n2);
    let result = Number(m1.value) * Number(m2.value);
    let displayResult = document.getElementById('result');
    displayResult.innerHTML = "=";
    displayResult.style.color = 'green';
    setTimeout(() => {
      displayResult.innerHTML = "";
      displayResult.removeAttribute("style");
    }, 800);
}

function divide(n1, n2) {
    let d1 = document.getElementById(n1);
    let d2 = document.getElementById(n2);
    let result = Number(d1.value) / Number(d2.value);
    let displayResult = document.getElementById('result');
    displayResult.innerHTML = "=";
    displayResult.style.color = 'green';
    setTimeout(() => {
      displayResult.innerHTML = "";
      displayResult.removeAttribute("style");
    }, 800);
}
//displaying the actual date

function displayDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let displayDate = document.getElementById('date');
  displayDate.innerHTML = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
  setTimeout(() => {
    displayDate.innerHTML = "";
    displayDate.removeAttribute("style");
  }, 800);
}
setInterval(displayDate, 1000);

