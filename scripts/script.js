//Get all buttons from HTML
const numberKeys = document.querySelectorAll(".key-number");
const operatorKeys = document.querySelectorAll(".key-operator");
const equalKey = document.querySelector(".key-equals");
const clearKey = document.querySelector(".key-clear");
const decimalKey = document.querySelector(".key-decimal");

const CALCULATOR = document.querySelector(".calculator");
const DISPLAY = document.querySelector(".calculator__display");

numberKeys.forEach(button =>{
    button.addEventListener("click", e => {
        const keyContent = e.target.textContent;
        const currentDisplay = DISPLAY.textContent;
        const previousKeyType = CALCULATOR.dataset.previousKeyType;

        if(currentDisplay === "0" || previousKeyType === "operator"){
            DISPLAY.textContent = keyContent;
        }else{
            DISPLAY.textContent = currentDisplay + keyContent;
        }

        CALCULATOR.dataset.previousKeyType = "number";
    });
})

operatorKeys.forEach(button =>{
    button.addEventListener("click", e => {
        const previousKeyType = CALCULATOR.dataset.previousKeyType;
        const currentDisplay = DISPLAY.textContent;
        const action = e.target.dataset.action;

        const firstNum = CALCULATOR.dataset.firstNum;
        const secondNum = currentDisplay;
        const operator = CALCULATOR.dataset.operator;

        //Check for first number, a previous operator and a second number
        if(firstNum && operator && previousKeyType !== "operator"){
            const solvedNum = solve(firstNum, operator, secondNum);
            DISPLAY.textContent = solvedNum;
            CALCULATOR.dataset.firstNum = solvedNum;
        }else{
            CALCULATOR.dataset.firstNum = currentDisplay;
        }

        e.target.classList.add("is-pressed");
        CALCULATOR.dataset.operator = action;            
        CALCULATOR.dataset.previousKeyType = "operator";
    });
})

decimalKey.addEventListener("click", () => {
    const currentDisplay = DISPLAY.textContent;
    const previousKeyType = CALCULATOR.dataset.previousKeyType;

    if(!currentDisplay.includes(".")){ //Check so that only one deciaml point
        DISPLAY.textContent = currentDisplay + ".";
    }else if(previousKeyType === "operator"){
        DISPLAY.textContent = "0.";
    }

    CALCULATOR.dataset.previousKeyType = "decimal";
})

clearKey.addEventListener("click", () => {
    DISPLAY.textContent = "0";
    delete CALCULATOR.dataset.firstNum;
    delete CALCULATOR.dataset.operator;
    delete CALCULATOR.dataset.previousKeyType;
    operatorKeys.forEach(button => button.classList.remove("is-pressed"));
})

equalKey.addEventListener("click", () => {
    const currentDisplay = DISPLAY.textContent;
    const previousKeyType = CALCULATOR.dataset.previousKeyType;

    let firstNum = CALCULATOR.dataset.firstNum;
    let secondNum = currentDisplay;
    const operator = CALCULATOR.dataset.operator;
    if(firstNum /*&& previousKeyType === "number"*/){//previousKeyType === "operator"){
        if(previousKeyType === "solve"){
            firstNum = currentDisplay;
            secondNum = CALCULATOR.dataset.modValue;
        }

        DISPLAY.textContent = solve(firstNum, operator, secondNum);
    }else{
        alert("Invalid Format");
    }
    CALCULATOR.dataset.modValue = secondNum;
    CALCULATOR.dataset.previousKeyType = "solve";
})

const solve = (num1, operator, num2) =>{
    let result;
    
    if(operator === "add"){
        result = parseFloat(num1) + parseFloat(num2);
    }
    if(operator === "subtract"){
        result = parseFloat(num1) - parseFloat(num2);
    }
    if(operator === "multiply"){
        result = parseFloat(num1) * parseFloat(num2);
    }
    if(operator === "divide"){
        result = parseFloat(num1) / parseFloat(num2);
    }

    return result;
}