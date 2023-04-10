const btnToggle = document.querySelector('.btn-toggle');
const menu = document.querySelector('.menu');

btnToggle.addEventListener("click", (evt) => {
	menu.classList.toggle('is-open');
});