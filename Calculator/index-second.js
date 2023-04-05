class Calculator{
    constructor(btnPrevOperand, btnCurrOperand){
        this.btnPrevOperand = btnPrevOperand;
        this.btnCurrOperand = btnCurrOperand;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operand){
        if(this.previousOperand !== "" && this.currentOperand !== ""){
            this.compute();
        } else if(this.previousOperand !== "" && this.currentOperand === ""){
            this.currentOperand = this.previousOperand.slice(0, -1);
        }else if(this.previousOperand === "" && this.currentOperand === ""){
            return;
        }
        this.operation = operand;
        this.previousOperand = `${this.currentOperand}${this.operation}`;
        this.currentOperand = "";
    }

    compute(){
        let result = `${this.previousOperand} ${this.currentOperand}`;

        if(!result) return;
        if(result.includes('÷')){
            result = result.replace('÷', '/');
        }

        this.currentOperand = this.getStrWithCommas(new Function('return ' + result)());
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay(){
        this.btnCurrOperand.textContent = this.getStrWithCommas(this.currentOperand);
        this.btnPrevOperand.textContent = this.getStrWithCommas(this.previousOperand);
    }
    
    deleteLast(){
        if(this.currentOperand === "") return;
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    removeCommas(inputStr){
        if(inputStr.includes(',')){
            return inputStr.replaceAll(',','');
        }
        return inputStr;
    }

    getStrWithCommas(inputStr){
        return inputStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    test(inputStr){
        const [integerDigits, decimalDigits] = inputStr.slpit('.');
    }
}


const bntNumbers   = document.querySelectorAll("[data-number]"),
    btnOperands    = document.querySelectorAll("[data-operand]"),
    btnPrevOperand = document.querySelector("[data-previous-operand]"),
    btnCurrOperand = document.querySelector("[data-current-operand]"),
    btnDeleteLast  = document.querySelector("[data-delete]"),
    btnAllClear    = document.querySelector("[data-all-clear]"),
    btnEquals      = document.querySelector("[data-equals]");

const calculator = new Calculator(btnPrevOperand, btnCurrOperand);

bntNumbers.forEach( btnNumber => {
    btnNumber.addEventListener("click", evt => {
        calculator.appendNumber(btnNumber.textContent);
        calculator.updateDisplay();
    });
});

btnOperands.forEach( btnOperand => {
    btnOperand.addEventListener("click", evt => {
        calculator.chooseOperation(btnOperand.textContent);
        calculator.updateDisplay();
    });
});
btnEquals.addEventListener("click", evt => {
    calculator.compute();
    calculator.updateDisplay();
});
btnDeleteLast.addEventListener("click", (evt) => {
    calculator.deleteLast();
    calculator.updateDisplay();
});
btnAllClear.addEventListener("click", (evt) => {
    calculator.clear();
    calculator.updateDisplay();
});