const CALCULATOR = document.querySelector(".calculator");
const KEYS = CALCULATOR.querySelector(".calculator__keys");

KEYS.addEventListener("click", e =>{

    if(e.target.matches("button")){
        const key = e.target;
        const action = key.dataset.action;
        
        if(!action){
            console.log("number key!");
        }

        if(action === "add" || action === "subtract" || action === "divide" || action === "multiply"){
            console.log("operator key");
        }

        if(action === "clear"){
            console.log("Clear key");
        }

        if(action === "decimal"){
            console.log("decimal key");
        }

        if(action === "solve"){
            console.log("equals key")
        }
    }
});