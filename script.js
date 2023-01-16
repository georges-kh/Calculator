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
function decimalCheck(e) {
  if (e.srcElement.dataset.value === "." && number.includes(".")) {
    return;
  } else {
    number += e.srcElement.dataset.value;
  }
}


// hands off the current and previous values of an operation as well as the operator
function runOperation() {

  if (operator !== "=") {

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
  operator = this.dataset.value; 
}


// returns the number of digits after the decimal point (9 max)
function dynamicRounding() {
  let available = Math.abs(previousNumber.toString().length - 9);
  return available;
}


// handles the function buttons
function runFunction() {

  // calls clear function
  if (this.dataset.value === "clear") {
    clear();

  // removes the last character from number and updates screen
  } else if (this.dataset.value === "delete") {
    number = number.slice(0, -1);
    display();

  // inverts sign of current number (and result)
  } else if (this.dataset.value === "invert") {

    // if an operation has already taken place
    if (operator === "=") {

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
  } else {
    if (operator === "=") {
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
  decimal.setAttribute("data-value", ".");
}


// DOM object for the screen div
const screen = document.getElementById("display");

// DOM object for all digit buttons
const digits = document.querySelectorAll(".digit-button");
// assigns event listeners for a click
digits.forEach(digit => digit.addEventListener("click", function(e) {
  decimalCheck(e);
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
  //console.log(e.key)
   if (Number.isInteger((+e.key)) || e.key === ".") {
     number += e.key;
     updateDisplay();
   } //else if (e.key in ["+", "-", "*", "/"]) 
});