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
        }

        if(action === "add" || action === "subtract" || action === "divide" || action === "multiply"){
            key.classList.add("is-pressed");
            CALCULATOR.dataset.firstNum = currentDisplay;
            CALCULATOR.dataset.operator = action;
            CALCULATOR.dataset.previousKeyType = "operator";
        }

        if(action === "clear"){
            DISPLAY.textContent = "0";
            CALCULATOR.dataset.firstNum = " ";
            CALCULATOR.dataset.operator = " ";
            CALCULATOR.dataset.previousKeyType = " ";
            Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-pressed'));
        }

        if(action === "decimal"){
            if(!currentDisplay.includes(".")){ //Check so that only one deciaml point
                DISPLAY.textContent = currentDisplay + ".";
            }
        }

        if(action === "solve"){
            const firstNum = CALCULATOR.dataset.firstNum;
            const secondNum = currentDisplay;
            const operator = CALCULATOR.dataset.operator;
            DISPLAY.textContent = solve(firstNum, operator, secondNum);
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