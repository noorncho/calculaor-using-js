"use strict";

var CALCULATOR = document.getElementById("calculator");
var KEYS = CALCULATOR.querySelector(".calculator__keys");
var DISPLAY = document.getElementById("calculator__display");
KEYS.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    var key = e.target;
    var action = key.dataset.action;
    var keyContent = key.textContent;
    var currentDisplay = DISPLAY.textContent;
    var previousKeyType = CALCULATOR.dataset.previousKeyType;

    if (!action) {
      if (currentDisplay === "0" || previousKeyType === "operator") {
        DISPLAY.textContent = keyContent;
      } else {
        DISPLAY.textContent = currentDisplay + keyContent;
      }

      CALCULATOR.dataset.previousKeyType = "number";
    }

    if (action === "add" || action === "subtract" || action === "divide" || action === "multiply") {
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

      key.classList.add("is-pressed");
      CALCULATOR.dataset.operator = action;
      CALCULATOR.dataset.previousKeyType = "operator";
    }

    if (action === "clear") {
      DISPLAY.textContent = "0";
      delete CALCULATOR.dataset.firstNum;
      delete CALCULATOR.dataset.operator;
      delete CALCULATOR.dataset.previousKeyType;
      Array.from(key.parentNode.children).forEach(function (k) {
        return k.classList.remove('is-pressed');
      });
    }

    if (action === "decimal") {
      if (!currentDisplay.includes(".")) {
        //Check so that only one deciaml point
        DISPLAY.textContent = currentDisplay + ".";
      } else if (previousKeyType === "operator") {
        DISPLAY.textContent = "0.";
      }

      CALCULATOR.dataset.previousKeyType = "decimal";
    }

    if (action === "solve") {
      var _firstNum = CALCULATOR.dataset.firstNum;
      var _secondNum = currentDisplay;
      var _operator = CALCULATOR.dataset.operator;

      if (_firstNum
      /*&& previousKeyType === "number"*/
      ) {
          //previousKeyType === "operator"){
          if (previousKeyType === "solve") {
            _firstNum = currentDisplay;
            _secondNum = CALCULATOR.dataset.modValue;
          }

          DISPLAY.textContent = solve(_firstNum, _operator, _secondNum);
        } else {
        alert("Invalid Format");
      }

      CALCULATOR.dataset.modValue = _secondNum;
      CALCULATOR.dataset.previousKeyType = "solve";
    }

    Array.from(key.parentNode.children).forEach(function (k) {
      return k.classList.remove('is-pressed');
    });
  }
});

var solve = function solve(num1, operator, num2) {
  var result = " ";

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