const CALCULATOR = document.getElementById("calculator");
const KEYS = CALCULATOR.querySelector(".calculator__keys");
const DISPLAY = document.getElementById("calculator__display");

KEYS.addEventListener("click", e =>{

    if(e.target.matches("button")){
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const currentDisplay = DISPLAY.textContent;
        
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
            console.log("Clear key");
        }

        if(action === "decimal"){
            if(!currentDisplay.includes(".")){ //Check so that only one deciaml point
                DISPLAY.textContent = currentDisplay + ".";
            }
        }

        if(action === "solve"){
            console.log("equals key")
        }
    }
});