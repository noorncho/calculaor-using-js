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

    if (!action) {
      if (currentDisplay === "0" || previousKeyType === "operator") {
        DISPLAY.textContent = keyContent;
      } else {
        DISPLAY.textContent = currentDisplay + keyContent;
      }
    }

    if (action === "add" || action === "subtract" || action === "divide" || action === "multiply") {
      key.classList.add("is-pressed");
      CALCULATOR.dataset.firstNum = currentDisplay;
      CALCULATOR.dataset.operator = action;
      CALCULATOR.dataset.previousKeyType = "operator";
    }

    if (action === "clear") {
      console.log("Clear key");
    }

    if (action === "decimal") {
      if (!currentDisplay.includes(".")) {
        //Check so that only one deciaml point
        DISPLAY.textContent = currentDisplay + ".";
      }
    }

    if (action === "solve") {
      var firstNum = CALCULATOR.dataset.firstNum;
      var secondNum = currentDisplay;
      var operator = CALCULATOR.dataset.operator; //console.log("equals key")

      DISPLAY.textContent = solve(firstNum, operator, secondNum);
    }
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