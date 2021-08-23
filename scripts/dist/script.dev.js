"use strict";

//Get all buttons from HTML
var numberKeys = document.querySelectorAll(".key-number");
var operatorKeys = document.querySelectorAll(".key-operator");
var equalKey = document.querySelector(".key-equals");
var clearKey = document.querySelector(".key-clear");
var decimalKey = document.querySelector(".key-decimal");
var negationKey = document.querySelector(".key-negation"); //Get the calculator div and the display div

var CALCULATOR = document.querySelector(".calculator");
var DISPLAY = document.querySelector(".calculator__display");
/***
 *  ON CLICK EVENT LISTENER
 */

numberKeys.forEach(function (button) {
  button.addEventListener("click", function (e) {
    var keyContent = e.target.textContent;
    var currentDisplay = DISPLAY.textContent; //Retrieve current display

    var previousKeyType = CALCULATOR.dataset.previousKeyType; //Retrieve the previous key pressed

    if (currentDisplay === "0" || previousKeyType === "operator") {
      //Needed for start and after equals
      DISPLAY.textContent = keyContent;
    } else {
      DISPLAY.textContent = currentDisplay + keyContent;
    }

    CALCULATOR.dataset.previousKeyType = "number";
  });
});
operatorKeys.forEach(function (button) {
  button.addEventListener("click", function (e) {
    var previousKeyType = CALCULATOR.dataset.previousKeyType;
    var currentDisplay = DISPLAY.textContent;
    var action = e.target.dataset.action;
    var firstNum = CALCULATOR.dataset.firstNum;
    var secondNum = currentDisplay;
    var operator = CALCULATOR.dataset.operator; //Check for first number, a previous operator and a second number

    if (firstNum && operator && previousKeyType !== "operator") {
      var solvedNum = solve(firstNum, operator, secondNum);
      DISPLAY.textContent = solvedNum;
      CALCULATOR.dataset.firstNum = solvedNum;
    } else {
      CALCULATOR.dataset.firstNum = currentDisplay;
    }

    CALCULATOR.dataset.operator = action;
    CALCULATOR.dataset.previousKeyType = "operator";
  });
});
decimalKey.addEventListener("click", function () {
  var currentDisplay = DISPLAY.textContent;
  var previousKeyType = CALCULATOR.dataset.previousKeyType;

  if (!currentDisplay.includes(".")) {
    //Check so that only one deciaml point
    DISPLAY.textContent = currentDisplay + ".";
  } else if (previousKeyType === "operator") {
    //Shortcut for writing a number < 1
    DISPLAY.textContent = "0.";
  }

  CALCULATOR.dataset.previousKeyType = "decimal";
});
negationKey.addEventListener("click", function () {
  var currentDisplay = DISPLAY.textContent;
  var previousKeyType = CALCULATOR.dataset.previousKeyType;

  if (currentDisplay === "0" || previousKeyType === "operator") {
    DISPLAY.textContent = "-";
  } else if (currentDisplay.includes("-")) {
    DISPLAY.textContent = currentDisplay.replace("-", "");
  } else {
    //if(!currentDisplay.includes("-")){
    DISPLAY.textContent = "-" + currentDisplay;
  } //CALCULATOR.dataset.previousKeyType = "negation";

});
clearKey.addEventListener("click", function () {
  DISPLAY.textContent = "0";
  delete CALCULATOR.dataset.firstNum;
  delete CALCULATOR.dataset.operator;
  delete CALCULATOR.dataset.previousKeyType;
  delete CALCULATOR.dataset.tempValue;
});
equalKey.addEventListener("click", function () {
  var currentDisplay = DISPLAY.textContent;
  var previousKeyType = CALCULATOR.dataset.previousKeyType;
  var firstNum = CALCULATOR.dataset.firstNum;
  var secondNum = currentDisplay;
  var operator = CALCULATOR.dataset.operator;

  if (firstNum
  /*&& previousKeyType === "number"*/
  ) {
      //previousKeyType === "operator"){
      if (previousKeyType === "solve") {
        firstNum = currentDisplay;
        secondNum = CALCULATOR.dataset.tempValue;
      }

      DISPLAY.textContent = solve(firstNum, operator, secondNum);
    } else {
    alert("Invalid Format");
  }

  DISPLAY.textContent = solve(firstNum, operator, secondNum);
  CALCULATOR.dataset.tempValue = secondNum;
  CALCULATOR.dataset.previousKeyType = "solve";
});
/**
 * Keyboard Listener
 */

document.addEventListener("keypress", function (e) {
  var currentDisplay = DISPLAY.textContent;
  var previousKeyType = CALCULATOR.dataset.previousKeyType;

  if (Number.isInteger(Number(e.key))) {
    var keyContent = e.key; // const currentDisplay = DISPLAY.textContent;
    // const previousKeyType = CALCULATOR.dataset.previousKeyType;

    if (currentDisplay === "0" || previousKeyType === "operator") {
      DISPLAY.textContent = keyContent;
    } else {
      DISPLAY.textContent = currentDisplay + keyContent;
    }

    CALCULATOR.dataset.previousKeyType = "number";
  }

  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "÷") {
    // const previousKeyType = CALCULATOR.dataset.previousKeyType;
    // const currentDisplay = DISPLAY.textContent;
    var firstNum = CALCULATOR.dataset.firstNum;
    var secondNum = currentDisplay;
    var operator = getOperator(e.key); //Check for first number, a previous operator and a second number

    if (firstNum && operator && previousKeyType !== "operator") {
      var solvedNum = solve(firstNum, operator, secondNum);
      DISPLAY.textContent = solvedNum;
      CALCULATOR.dataset.firstNum = solvedNum;
    } else {
      CALCULATOR.dataset.firstNum = currentDisplay;
    }

    CALCULATOR.dataset.previousKeyType = "operator";
  }

  if (e.key === ".") {
    // const currentDisplay = DISPLAY.textContent;
    // const previousKeyType = CALCULATOR.dataset.previousKeyType;
    if (!currentDisplay.includes(".")) {
      DISPLAY.textContent = currentDisplay + ".";
    } else if (previousKeyType === "operator") {
      DISPLAY.textContent = "0.";
    }

    CALCULATOR.dataset.previousKeyType = "decimal";
  }

  if (e.key === "Enter") {
    // const currentDisplay = DISPLAY.textContent;
    // const previousKeyType = CALCULATOR.dataset.previousKeyType;
    var _firstNum = CALCULATOR.dataset.firstNum;
    var _secondNum = currentDisplay;
    var _operator = CALCULATOR.dataset.operator;

    if (_firstNum
    /*&& previousKeyType === "number"*/
    ) {
        //previousKeyType === "operator"){
        if (previousKeyType === "solve") {
          _firstNum = currentDisplay;
          _secondNum = CALCULATOR.dataset.tempValue;
        }

        DISPLAY.textContent = solve(_firstNum, _operator, _secondNum);
      } else {
      alert("Invalid Format");
    }

    DISPLAY.textContent = solve(_firstNum, _operator, _secondNum);
    CALCULATOR.dataset.tempValue = _secondNum;
    CALCULATOR.dataset.previousKeyType = "solve";
  }

  console.log(e.key);
});

var solve = function solve(num1, operator, num2) {
  var result;

  if (operator === "add") {
    result = parseFloat(num1) + parseFloat(num2);
  }

  if (operator === "subtract") {
    result = parseFloat(num1) - parseFloat(num2);
  }

  if (operator === "multiply") {
    result = parseFloat(num1) * parseFloat(num2);
  }

  if (operator === "divide") {
    result = parseFloat(num1) / parseFloat(num2);
  }

  return result;
};

var getOperator = function getOperator(str) {
  switch (str) {
    case "+":
      CALCULATOR.dataset.operator = "add";
      break;

    case "-":
      CALCULATOR.dataset.operator = "subtract";
      break;

    case "÷":
      CALCULATOR.dataset.operator = "divide";
      break;

    case "*":
      CALCULATOR.dataset.operator = "multiply";
      break;
  }

  return CALCULATOR.dataset.operator;
};