"use strict";

let contentButton = document.querySelector('.content_button');
let contentContainer = document.querySelector('.content_container');
let categoriesList = document.querySelector('.list');
let buttonMore = document.querySelector('.aside_button');

function generateCategories(){
	let count = 0;	
	
	fetch('https://api.chucknorris.io/jokes/categories', {
		method: "GET"
	})
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			for (let i = 1; i < data.length; i++){
				let li = document.createElement('li');
				let span = document.createElement('span');
				categoriesList.appendChild(li);
				let newLi = li.appendChild(span);

				newLi.innerText = data[count];
				count++;
			}
		})
		.catch((err)=>{
			let error = new Error('Sorry, but an error occurred, we will definitely fix everything');
			console.log(error);
		})
}

generateCategories();

categoriesList.addEventListener('click', (event)=>{
	event.preventDefault();
	let target = event.target;
	let text = target.innerText;

	fetch('https://api.chucknorris.io/jokes/random?category=' + text,{
		method: "GET"
	})
		.then((res)=>{
			return res.json();
		})
		.then((text)=>{
			contentContainer.innerText = text.value;
		})
		.catch((err)=>{
			let error = new Error('Sorry, but an error occurred, we will definitely fix everything');
			console.log(error);
		})
});

buttonMore.addEventListener('click', (event)=>{
	event.stopPropagation();
	categoriesList.style.height = '100%';
	buttonMore.style.display = 'none';
});

contentButton.addEventListener('click', getJoke);

function getJoke(){
	fetch('https://api.chucknorris.io/jokes/random', {
		method: "GET"
	})
		.then((res)=>{
			return res.json();
		})
		.then((text)=>{
			contentContainer.innerText = text.value;
		})
		.catch((err)=>{
			let error = new Error('Sorry, but an error occurred, we will definitely fix everything');
			console.log(error);
		})
}