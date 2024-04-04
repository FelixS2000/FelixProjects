// Get references to the display and buttons
const display = document.getElementById('result');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.getElementById('equals');
const clearButton = document.querySelector('button[data-value="clear"]');

// Add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => handleNumber(button.dataset.value));
});

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
  button.addEventListener('click', () => handleOperator(button.dataset.operator));
});

// Add event listener to equals button
equalsButton.addEventListener('click', handleEquals);

// Add event listener to clear button
clearButton.addEventListener('click', handleClear);

// Functions for handling button actions
function handleNumber(value) {
  const currentDisplayValue = display.value;
  if (waitingForSecondValue) {
    display.value = value;
    waitingForSecondValue = false;
  } else {
    display.value = currentDisplayValue === '0' ? value : currentDisplayValue + value;
  }
}

function handleOperator(op) {
  firstValue = parseFloat(display.value);
  operator = op;
  waitingForSecondValue = true;
  display.value = '';
}

function handleClear() {
  display.value = '0';
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
}

function handleEquals() {
  if (firstValue === null || operator === null) {
    return;
  }
  const secondValue = parseFloat(display.value);
  let result = null;
  switch (operator) {
    case '+':
      result = firstValue + secondValue;
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    case '*':
      result = firstValue * secondValue;
      break;
    case '/':
      if (secondValue === 0) {
        alert('Error: Cannot divide by zero!');
        return;
      }
      result = firstValue / secondValue;
      break;
    default:
      throw new Error(`Unknown operator ${operator}`);
  }

  // Update the display to show the calculation result
  display.value = result.toString();
  // Reset for next calculation
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
}
