
const buttonBlock = document.querySelector(".buttons-block"),
    input = document.querySelector(".input-field"),
    checkbox = document.querySelector(".change-theme");


function evil(str){
    return new Function('return ' + str)();
}
buttonBlock.addEventListener("click", (evt) => {
    if(evt.target.nodeName !== "BUTTON") return;

    if(evt.target.textContent === "AC"){
        input.value = "";
        return;
    }else if(evt.target.textContent === "DE"){
        input.value = input.value.slice(0, -1);// possible options: .slice(0, input.value.length - 1)
        return;
    }else if(evt.target.textContent === "="){
        input.value = Number(evil(input.value).toFixed(4));
        return;
    }else if(evt.target.classList.value.includes("btn")){
        input.value += evt.target.textContent;
        return;
    }
});
checkbox.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});