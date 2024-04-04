const display = document.getElementById('result');
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

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
