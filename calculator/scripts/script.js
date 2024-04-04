document.addEventListener("DOMContentLoaded", function() {
  const resultField = document.getElementById("result");
  const numberButtons = document.querySelectorAll(".number-button");
  const operatorButtons = document.querySelectorAll(".operator-button");
  const equalsButton = document.getElementById("equals");
  const clearButton = document.querySelector("[data-value='clear']");

  let currentInput = '';
  let previousInput = '';
  let operator = '';

  function clear() {
      currentInput = '';
      previousInput = '';
      operator = '';
      updateDisplay();
  }

  function updateDisplay() {
      resultField.value = currentInput || '0';
  }

  function handleNumberButtonClick(event) {
      const number = event.target.dataset.value;
      currentInput += number;
      updateDisplay();
  }

  function handleOperatorButtonClick(event) {
      if (currentInput !== '') {
          operator = event.target.dataset.operator;
          previousInput = currentInput;
          currentInput = '';
          updateDisplay();
      }
  }

  function calculate() {
      const previous = parseFloat(previousInput);
      const current = parseFloat(currentInput);

      switch (operator) {
          case '+':
              currentInput = previous + current;
              break;
          case '-':
              currentInput = previous - current;
              break;
          case '*':
              currentInput = previous * current;
              break;
          case '/':
              if (current !== 0) {
                  currentInput = previous / current;
              } else {
                  currentInput = 'Error';
              }
              break;
      }

      previousInput = '';
      operator = '';
      updateDisplay();
  }

  numberButtons.forEach(button => {
      button.addEventListener("click", handleNumberButtonClick);
  });

  operatorButtons.forEach(button => {
      button.addEventListener("click", handleOperatorButtonClick);
  });

  equalsButton.addEventListener("click", calculate);

  clearButton.addEventListener("click", clear);
});
