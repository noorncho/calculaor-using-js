//Get all buttons from HTML
const numberKeys = document.querySelectorAll(".key-number");
const operatorKeys = document.querySelectorAll(".key-operator");
const equalKey = document.querySelector(".key-equals");
const clearKey = document.querySelector(".key-clear");
const decimalKey = document.querySelector(".key-decimal");
const negationKey = document.querySelector(".key-negation");

//Get the calculator div and the display div
const CALCULATOR = document.querySelector(".calculator");
const DISPLAY = document.querySelector(".calculator__display");




/***
 *  ON CLICK EVENT LISTENER
 */
numberKeys.forEach(button =>{
    button.addEventListener("click", e => {
        const keyContent = e.target.textContent;
        const currentDisplay = DISPLAY.textContent; //Retrieve current display
        const previousKeyType = CALCULATOR.dataset.previousKeyType; //Retrieve the previous key pressed

        if(currentDisplay === "0" || previousKeyType === "operator"){  //Needed for start and after equals
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

        CALCULATOR.dataset.operator = action;            
        CALCULATOR.dataset.previousKeyType = "operator";
    });
})

decimalKey.addEventListener("click", () => {
    const currentDisplay = DISPLAY.textContent;
    const previousKeyType = CALCULATOR.dataset.previousKeyType;

    if(!currentDisplay.includes(".")){ //Check so that only one deciaml point
        DISPLAY.textContent = currentDisplay + ".";
    }else if(previousKeyType === "operator"){ //Shortcut for writing a number < 1
        DISPLAY.textContent = "0.";
    }

    CALCULATOR.dataset.previousKeyType = "decimal";
})

negationKey.addEventListener("click", () =>{
    const currentDisplay = DISPLAY.textContent;
    const previousKeyType = CALCULATOR.dataset.previousKeyType;
    
    if(currentDisplay === "0" || previousKeyType === "operator"){
        DISPLAY.textContent = "-";
    }else if(currentDisplay.includes("-")){
        DISPLAY.textContent = currentDisplay.replace("-", "");
    }else{
    //if(!currentDisplay.includes("-")){
        DISPLAY.textContent = "-" + currentDisplay;
    }
    //CALCULATOR.dataset.previousKeyType = "negation";
})

clearKey.addEventListener("click", () => {
    DISPLAY.textContent = "0";
    delete CALCULATOR.dataset.firstNum;
    delete CALCULATOR.dataset.operator;
    delete CALCULATOR.dataset.previousKeyType;
    delete CALCULATOR.dataset.tempValue;
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
            secondNum = CALCULATOR.dataset.tempValue;
        }

        DISPLAY.textContent = solve(firstNum, operator, secondNum);
    }else{
        alert("Invalid Format");
    }
    DISPLAY.textContent = solve(firstNum, operator, secondNum);
    CALCULATOR.dataset.tempValue = secondNum;
    CALCULATOR.dataset.previousKeyType = "solve";
})

/**
 * Keyboard Listener
 */
document.addEventListener("keypress", e => {
    const currentDisplay = DISPLAY.textContent;
    const previousKeyType = CALCULATOR.dataset.previousKeyType;
    
    if(Number.isInteger(Number(e.key))){
        const keyContent = e.key;
        // const currentDisplay = DISPLAY.textContent;
        // const previousKeyType = CALCULATOR.dataset.previousKeyType;

        if(currentDisplay === "0" || previousKeyType === "operator"){
            DISPLAY.textContent = keyContent;
        }else{
            DISPLAY.textContent = currentDisplay + keyContent;
        }

        CALCULATOR.dataset.previousKeyType = "number";
    }
    
    if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "÷"){
        // const previousKeyType = CALCULATOR.dataset.previousKeyType;
        // const currentDisplay = DISPLAY.textContent;

        const firstNum = CALCULATOR.dataset.firstNum;
        const secondNum = currentDisplay;
        const operator = getOperator(e.key);

        //Check for first number, a previous operator and a second number
        if(firstNum && operator && previousKeyType !== "operator"){
            const solvedNum = solve(firstNum, operator, secondNum);
            DISPLAY.textContent = solvedNum;
            CALCULATOR.dataset.firstNum = solvedNum;
        }else{
            CALCULATOR.dataset.firstNum = currentDisplay;
        }
        
        CALCULATOR.dataset.previousKeyType = "operator";
    }

    if(e.key === "."){
        // const currentDisplay = DISPLAY.textContent;
        // const previousKeyType = CALCULATOR.dataset.previousKeyType;

        if(!currentDisplay.includes(".")){
            DISPLAY.textContent = currentDisplay + ".";
        }else if(previousKeyType === "operator"){
            DISPLAY.textContent = "0.";
        }

        CALCULATOR.dataset.previousKeyType = "decimal";
    }
    
    if(e.key === "Enter"){
        // const currentDisplay = DISPLAY.textContent;
        // const previousKeyType = CALCULATOR.dataset.previousKeyType;

        let firstNum = CALCULATOR.dataset.firstNum;
        let secondNum = currentDisplay;
        const operator = CALCULATOR.dataset.operator;
        if(firstNum /*&& previousKeyType === "number"*/){//previousKeyType === "operator"){
            if(previousKeyType === "solve"){
                firstNum = currentDisplay;
                secondNum = CALCULATOR.dataset.tempValue;
            }

            DISPLAY.textContent = solve(firstNum, operator, secondNum);
        }else{
            alert("Invalid Format");
        }
        DISPLAY.textContent = solve(firstNum, operator, secondNum);
        CALCULATOR.dataset.tempValue = secondNum;
        CALCULATOR.dataset.previousKeyType = "solve";
    }
    console.log(e.key);
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

const getOperator = (str) => {
    switch(str){
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
}