//------------------------ Data for Quizlet ------------------------
const quizlet = [
	{ 
		question: "He ___ his work. Why don’t we invite him out?", 
		options: [ 
			{text: "have finished", isCorrect: false},
			{text: "has finished", isCorrect: true},
			{text: "has finish", isCorrect: false},
		]
	},
		{ 
		question: "We ___ to France recently.", 
		options: [ 
			{text: "have move", isCorrect: false},
			{text: "have moved", isCorrect: true},
			{text: "has move", isCorrect: false},
		]
	},
		{ 
		question: "Oxford University Press ___ thousands of books.", 
		options: [ 
			{text: "have published", isCorrect: false},
			{text: "was published", isCorrect: false},
			{text: "has published", isCorrect: true},
		]
	},
		{ 
		question: "I ___ a computer since I was three.", 
		options: [ 
			{text: "have had", isCorrect: true},
			{text: "has have", isCorrect: false},
			{text: "has had", isCorrect: false},
		]
	},
];

let currentIndex = -1;
let score = 0;

const btnSubmit 	= document.querySelector(".submit-btn"),
	currentQuestion = document.querySelector(".question__text"),
	options			= document.querySelector(".options__block"),
	mainBlock		= document.querySelector(".main__questions"),
	resultBlock		= document.querySelector(".main__result"),
	resultTitle		= document.querySelector(".main__title");

function startQuiz(){
	const selectOption = (evt) => {
		evt.target.classList.remove("unselected_answer");
		if(evt.target.dataset.isCorrect === "true"){
			evt.target.classList.add("correct-answer");
			score++;
		}else{
			evt.target.classList.add("wrong-answer");
		}

		Array.prototype.forEach.call(options.children, child => {
			if(child.dataset.isCorrect === "true"){
				child.classList.add("correct-answer");
			}

			child.disabled = true;
		});

		btnSubmit.style.display = "inline";
	};
	currentQuestion.textContent = (currentIndex + 1) + ". " + quizlet[currentIndex].question;

	quizlet[currentIndex].options.sort(() => Math.random() - 0.5);
	
	for(const option of quizlet[currentIndex].options){
		const btnOption = document.createElement("button");
		btnOption.classList.add("btn-option");
		btnOption.textContent = option.text;
		btnOption.dataset.isCorrect = option.isCorrect;
		btnOption.addEventListener("click", selectOption);
		options.appendChild(btnOption);
	}

	btnSubmit.style.display = "none";
}

function removePreviousOptions(){
	while(options.firstChild){
		options.removeChild(options.firstChild);
	}
}

function handleNextOption(){
	if(currentIndex === 0){
		resultBlock.style.display = "none";
		mainBlock.style.display = "block";
		btnSubmit.textContent = "Next";
	}
	removePreviousOptions();
	startQuiz();
}
function showResult(){
	removePreviousOptions();
	mainBlock.style.display = "none";

	resultBlock.style.display = "block";
	resultTitle.textContent = `Your score is ${score} out of ${quizlet.length}`;
	btnSubmit.textContent = "Restart";

	currentIndex = -1;
	score = 0;
}

btnSubmit.addEventListener("click", (evt) => {
	currentIndex++;
	if(currentIndex < quizlet.length){
		handleNextOption();
		return;
	}

	showResult();
});