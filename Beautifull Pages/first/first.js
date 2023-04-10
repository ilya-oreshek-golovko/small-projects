const btnToggle = document.querySelector('.btn-toggle');
const menu = document.querySelector('.menu');

btnToggle.addEventListener("click", (evt) => {
	menu.classList.toggle('is-open');
});

const handledCustomersInfo = new Map();
handledCustomersInfo.set(111, {qq: 11, ww: 1111});
handledCustomersInfo.set(222, {qq: 22, ww: 2222});
for(const [key, value] of handledCustomersInfo.entries()){
	console.log(key + " : " + value.qq + ", " + value.ww );
}