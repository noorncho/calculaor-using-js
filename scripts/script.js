const CALCULATOR = document.getElementById("calculator");
const KEYS = CALCULATOR.querySelector(".calculator__keys");
const DISPLAY = document.getElementById("calculator__display");

KEYS.addEventListener("click", e =>{

    if(e.target.matches("button")){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const currentDisplay = DISPLAY.textContent;
        const previousKeyType = CALCULATOR.dataset.previousKeyType;
        
        if(!action){
            if(currentDisplay === "0" || previousKeyType === "operator"){
                DISPLAY.textContent = keyContent;
            }else{
                DISPLAY.textContent = currentDisplay + keyContent;
            }

            CALCULATOR.dataset.previousKeyType = "number";
        }

        if(action === "add" || action === "subtract" || action === "divide" || action === "multiply"){
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

            key.classList.add("is-pressed");
            CALCULATOR.dataset.operator = action;            
            CALCULATOR.dataset.previousKeyType = "operator";
        }

        if(action === "clear"){
            DISPLAY.textContent = "0";
            delete CALCULATOR.dataset.firstNum;
            delete CALCULATOR.dataset.operator;
            delete CALCULATOR.dataset.previousKeyType;
            Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-pressed'));
        }

        if(action === "decimal"){
            if(!currentDisplay.includes(".")){ //Check so that only one deciaml point
                DISPLAY.textContent = currentDisplay + ".";
            }else if(previousKeyType === "operator"){
                DISPLAY.textContent = "0.";
            }

            CALCULATOR.dataset.previousKeyType = "decimal";
        }

        if(action === "solve"){
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
        }
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-pressed'));
    }
});

const solve = (num1, operator, num2) =>{
    let result = " ";

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