"use strict";

//Get all buttons from HTML
var numberKeys = document.querySelectorAll(".key-number");
var operatorKeys = document.querySelectorAll(".key-operator");
var equalKey = document.querySelector(".key-equals");
var clearKey = document.querySelector(".key-clear");
var decimalKey = document.querySelector(".key-decimal");
var CALCULATOR = document.querySelector(".calculator");
var DISPLAY = document.querySelector(".calculator__display");
numberKeys.forEach(function (button) {
  button.addEventListener("click", function (e) {
    var keyContent = e.target.textContent;
    var currentDisplay = DISPLAY.textContent;
    var previousKeyType = CALCULATOR.dataset.previousKeyType;

    if (currentDisplay === "0" || previousKeyType === "operator") {
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

    e.target.classList.add("is-pressed");
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
    DISPLAY.textContent = "0.";
  }

  CALCULATOR.dataset.previousKeyType = "decimal";
});
clearKey.addEventListener("click", function () {
  DISPLAY.textContent = "0";
  delete CALCULATOR.dataset.firstNum;
  delete CALCULATOR.dataset.operator;
  delete CALCULATOR.dataset.previousKeyType;
  operatorKeys.forEach(function (button) {
    return button.classList.remove("is-pressed");
  });
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
        secondNum = CALCULATOR.dataset.modValue;
      }

      DISPLAY.textContent = solve(firstNum, operator, secondNum);
    } else {
    alert("Invalid Format");
  }

  CALCULATOR.dataset.modValue = secondNum;
  CALCULATOR.dataset.previousKeyType = "solve";
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