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
      if (currentDisplay === "0") {
        DISPLAY.textContent = keyContent;
      } else {
        DISPLAY.textContent = currentDisplay + keyContent;
      }
    }

    if (action === "add" || action === "subtract" || action === "divide" || action === "multiply") {
      console.log("operator key");
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
      console.log("equals key");
    }
  }
});