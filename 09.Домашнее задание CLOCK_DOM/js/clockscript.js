'use strict';
(function() {
	let clock = document.getElementById('clock');	//часы
	let digital = document.createElement('span');	//электронные часы
	digital.setAttribute('class', 'digital');	
	clock.appendChild(digital);

	/*отрисовка циферблата*/
	let numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	for(let i = 0; i < 12; i++) {
		let clockFace = document.createElement('div');
		clockFace.setAttribute('class', 'clockFace'); //фон для цифр на циферблате
		clock.appendChild(clockFace);
		clockFace.style.transform = `rotate(${i * 30}deg)`; //поворот фона по циферблату
		let number = document.createElement('span');	//цифры на аналоговом циферблате
		number.setAttribute('class', 'number'); 
		number.innerText = numbers[i];
		number.style.transform = `rotate(-${i * 30}deg);`; //обратный поворот цифр
		clockFace.appendChild(number);
	}
	
	/*отрисовка стрелок*/
	let clockHands = document.createElement('div');	//блок со стрелками
	clockHands.setAttribute('class', 'clockHands'); 
	let hourHand = document.createElement('div');
	hourHand.setAttribute('class', 'hour');
	let minuteHand = document.createElement('div');
	minuteHand.setAttribute('class', 'minute');
	let secondHand = document.createElement('div');
	secondHand.setAttribute('class', 'second');
	clockHands.appendChild(hourHand);
	clockHands.appendChild(minuteHand);
	clockHands.appendChild(secondHand);
	clock.appendChild(clockHands);

	
	function displayDigitalTime(d) {
		digital.innerHTML = d.toLocaleTimeString();
	}
	
	function displayAnalogTime(d) {
		var tSec = 6*d.getSeconds();  //Определяем угол для секунд
		var tMin = 6*(d.getMinutes() + (1/60)*d.getSeconds()); //Определяем угол для минут
		var tHour = 30*(d.getHours() + (1/60)*d.getMinutes());  //Определяем угол для часов
		hourHand.style.transform = `rotate(${tHour}deg)`;
		minuteHand.style.transform = `rotate(${tMin}deg)`;
		secondHand.style.transform = `rotate(${tSec}deg)`;
	}

	setInterval(function(){
		var d = new Date();
		displayDigitalTime(d);
		displayAnalogTime(d);
	}, 1000);
}())