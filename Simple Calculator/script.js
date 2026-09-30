const display = document.getElementById("result");

const operatorButtons = document.querySelectorAll(
  '[data-action="operator"]'
);

const numberButtons = document.querySelectorAll(
  '[data-action="number"]'
);

const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

// Handle number button clicks

let firstOperand = null;
let secondOperand = null;
let operator = null;
let waitingForSecondOperand = false;

numberButtons.forEach((button) => {

  button.addEventListener("click", () => {

    if (waitingForSecondOperand) {

      display.value += button.dataset.value;
      secondOperand = Number(button.dataset.value);
      waitingForSecondOperand = false;

    } else if (display.value === "0") {

      display.value = button.dataset.value;

    } else {

      display.value += button.dataset.value;

    }

  });

});

// Handle operator button clicks

operatorButtons.forEach((button) => {

  button.addEventListener("click", () => {

    firstOperand = Number(display.value);
    operator = button.dataset.value;

    display.value += " " + operator + " ";

    waitingForSecondOperand = true;

  });

});

// Equals button click event

equalsButton.addEventListener("click", () => {

  let result = 0;

  if (operator === "+") {

    result = firstOperand + secondOperand;

  } else if (operator === "-") {

    result = firstOperand - secondOperand;

  } else if (operator === "*") {

    result = firstOperand * secondOperand;

  } else if (operator === "/") {

    result = firstOperand / secondOperand;

  }

  display.value = result;

});
clearButton.addEventListener("click", () => {

  display.value = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  waitingForSecondOperand = false;

});
