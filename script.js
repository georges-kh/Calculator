// adds two numbers
function add(a, b) {return a + b};

// subtracts two numbers from each other 
function subtract(a, b) {return a - b};

// multiples two numbers together
function multiply(a, b) {return a*b};

// divides two numbers
function divide(a, b) {
  if (b === 0) {alert("Nope!")}
  else {return a/b};
};


// selects which operation to run depending on the operator given
function operation(firstNumber, secondNumber, operator) {
  let a = firstNumber;
  let b = secondNumber;

  if (operator === "+") {return add(a, b)}
  else if (operator === "-") {return subtract(a, b)}
  else if (operator === "*") {return multiply(a, b)}
  else if (operator === "/") {return divide(a, b)}
}

// initial values of global variables
let number = "";
let previousNumber = "0";
let currentNumber = "";
let result = "";
let operator = "+";
let input = "";

// updates the calculated number
function display() {

  // adds 0 in front of "." for better readability
  if (number === ".") {number = "0."};

  // updates the screen
  screen.textContent = number;

  // hehe
  if (screen.textContent === "80085") {alert("Hehehe")}
}


// makes sure only one decimal point is in number
function decimalCheck() {
  if (input === "." && number.includes(".")) {
    return;
  } else {
    number += input;
  }
}


// hands off the current and previous values of an operation as well as the operator
function runOperation() {

  if (operator !== "Enter") {

    // save the number
    currentNumber = number;

    // calculate (add first number to initial which is 0)
    result = operation(+previousNumber, +currentNumber, operator);

    // save the result
    previousNumber = result;

    // calls the dynamicRounding function and assigns it to roundingFactor 
    let roundingFactor = dynamicRounding();

    // reset number
    number = "";

    // rounds the result to 9 digits at most after the decimal point
    const roundedResult = Math.round(result*(10**roundingFactor))/(10**roundingFactor);

    // updates screen
    screen.textContent = roundedResult;
  }

  // grabs the operator for next calculation
  operator = input; 
}


// returns the number of digits after the decimal point (9 max)
function dynamicRounding() {
  let available = Math.abs(previousNumber.toString().length - 9);
  return available;
}


// handles the function buttons
function runFunction() {

  // calls clear function
  if (input === "Escape") {
    clear();

  // removes the last character from number and updates screen
  } else if (input === "Backspace") {
    number = number.slice(0, -1);
    display();

  // inverts sign of current number (and result)
  } else if (input === "invert") {

    // if an operation has already taken place
    if (operator === "Enter") {

      //  invert the value for next operation
      previousNumber = -previousNumber

      // update number and display it
      number = previousNumber;
      display();

      // resets number
      number = "";

    // if first numbers are being entered
    } else {

      // invert the value of number and display it
      number = -number;
      display();
    }

    // returns current number as a percentage
  } else if (input === "%") {
    if (operator === "Enter") {
      previousNumber = previousNumber/100
      number = previousNumber;
      display();
      number = "";
    } else {
      number = number/100
      display();
    }
    
  }
}


// resets all changed variables to their initial values
function clear() {
  screen.textContent = "0";
  number = "";
  previousNumber = "0";
  currentNumber = "";
  result = "";
  operator = "+";
}


// DOM object for the screen div
const screen = document.getElementById("display");

// DOM object for all digit buttons
const digits = document.querySelectorAll(".digit-button");
// assigns event listeners for a click
digits.forEach(digit => digit.addEventListener("click", function(e) {
  input = e.srcElement.dataset.value;
  decimalCheck();
  display();
}));


// DOM object for all operator buttons
const operators = document.querySelectorAll(".operator-button");
// adds event listeners that call the runOperation function
operators.forEach(operator => operator.addEventListener("click", runOperation));

// DOM object for all function buttons
const funcButtons = document.querySelectorAll(".function-button");
// adds event listeners that call the runFunction buttons
funcButtons.forEach(func => func.addEventListener("click", runFunction));

window.addEventListener("keydown", function(e) {
  const keyPress = document.querySelector(`button[data-value="${e.key}"]`)
  let keyClass = keyPress.getAttribute("class");
  input = keyPress.dataset.value;
  if (keyClass === "digit-button") {
    decimalCheck();
    display();
  } else if (keyClass === "operator-button") {
    runOperation();
  } else {
    runFunction();
  }

});