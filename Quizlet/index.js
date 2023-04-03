//------------------------ Data for Quizlet ------------------------
const quizlet = [
	{ 
		question: "He ___ his work. Why don’t we invite him out?", 
		options: [ "have finished", "has finished", "has finish"], 
		answer: "has finished"
	},
		{ 
		question: "We ___ to France recently.", 
		options: [ "have move", "have moved", "has move"], 
		answer: "have moved"
	},
		{ 
		question: "Oxford University Press ___ thousands of books.", 
		options: [ "has published", "have published", "was published"], 
		answer: "has published"
	},
		{ 
		question: "I ___ a computer since I was three.", 
		options: [ "has have", "have had", "has had"], 
		answer: "have had"
	},
];

//------------------------ Common Variables ------------------------ 
const optionID = "option-";
const resultTemplate = 'Your scored {correctCount} out of {questionsCount}!';
let correctCount = 0;

//------------------------ Node Elements ------------------------
const currentQeustion = document.querySelector('.question__text'),
	optionsBody 	  = document.querySelector('.options__block'),
	resultSection 	  = document.querySelector('.main__result'), 
	questionSection   = document.querySelector('.main__questions'),
	btnSubmit 		  = document.getElementById('submit-btn');

//------------------------ CSS Properties ------------------------
// const optionRight = getComputedStyle(document.body).getPropertyValue('--option-right');
// const optionError = getComputedStyle(document.body).getPropertyValue('--option-error');
//document.body.style.setProperty('--my-variable-name', 'pink');

function getNextQuizObject(questionText){

	const defineOptionsElements = () => {
		const optionsCount = options.length,
			  elementCount = nodeOptions.length;

		if(elementCount == optionsCount) return;

		if(elementCount > optionsCount){
			let i = elementCount;
			do{
				nodeOptions[i].remove();
				i--;
			}while(i !== optionsCount);
		} else if(elementCount < optionsCount){
			let i = elementCount;
			do{
				const newOption = document.createElement('button');
				newOption.id = optionID + i;
				newOption.classList.add('btn-option');
				optionsBody.appendChild(newOption);
				i++;
			}while(i !== optionsCount);
		}
	}

	let index = 0;

	if(questionText){
		index = quizlet.findIndex( obj => obj.question == questionText);
		index++;
	}

	if(index == quizlet.length - 1){
		btnSubmit.textContent = "Finish";
	}else{
		btnSubmit.textContent = "Next";
	}

	currentQeustion.textContent = quizlet.at(index).question;
	const options = quizlet.at(index).options;

	options.sort(() => Math.random() - 0.5);

	const nodeOptions = optionsBody.children;
	defineOptionsElements();

	let iterator = 0;
	while(iterator != options.length){
		nodeOptions[iterator].textContent = options[iterator];
		iterator++;
	}
}

function completeQuizlet(){
	const resultText = document.querySelector('.main__title');

	setDisplay("none", "block");

	const replaceObjs = [
		{from: "{correctCount}", to: correctCount}, 
		{from: "{questionsCount}", to: quizlet.length}
	];

	let result = resultTemplate;
	for(const obj of replaceObjs){
		result = result.replace(obj.from, obj.to);
	}

	if(correctCount !== quizlet.length){
		btnSubmit.textContent = "Restart";
	}else{
		btnSubmit.textContent = "End";
	}

	resultText.textContent = result;
	currentQeustion.textContent = ""; 
	correctCount = 0;
}

function resetStyles(){
	if(questionSection.style.display !== "block"){
		setDisplay("block", "none");
	}
	for(const option of optionsBody.children){
		option.classList.value = "btn-option"; 
		option.disabled = false;
	}
}

function setDisplay(questionsBlock, resultBlock){
	resultSection.style.display = resultBlock;
	questionSection.style.display = questionsBlock;
}
//https://davidwalsh.name/event-delegate TODO
optionsBody.addEventListener("click", (e) => {
	if(e.target && e.target.nodeName == "BUTTON"){
		const correctAnswer = quizlet.find( obj => obj.question == currentQeustion.textContent)["answer"];
		const selectedAnswer = e.target.textContent;

		if(correctAnswer == selectedAnswer){
			correctCount += 1;
			e.target.classList.toggle("correct-answer");
		}else{
			let correctOption;
			Array.prototype.forEach.call(optionsBody.children, child => {
			  	if(child.textContent == correctAnswer){
					correctOption = child;
				}
			});

			e.target.classList.toggle("wrong-answer");
			correctOption.classList.toggle("correct-answer");
		}

		Array.prototype.forEach.call( optionsBody.children, option => {
			option.disabled = true;
		});
	}
});

btnSubmit.addEventListener("click", (e) => {


	if(btnSubmit.textContent == "Start" || btnSubmit.textContent == "Next"){
		resetStyles();
		getNextQuizObject(currentQeustion.textContent);
	} else if(btnSubmit.textContent == "Finish"){
		resetStyles();
		completeQuizlet();
	} else if(btnSubmit.textContent == "Restart"){
		setDisplay("block", "none");
		getNextQuizObject(currentQeustion.textContent);
	} else if(btnSubmit.textContent == "End"){
		setDisplay("none", "none");
		btnSubmit.textContent = "Start";
	}
});