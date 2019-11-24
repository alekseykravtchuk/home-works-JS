"use strict";

var vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
var line = inputLine("Введите строку для подсчета русских гласных букв:", "Пример").split('');
var counter = 0;

function check(a, letter) {
	if (vowels.includes(letter)) {
		return a + 1;
	} 
	return a;
}

counter = line.reduce(check, 0);

console.log("Количество гласных букв: " + counter);

function inputLine(message, example) {
	var line;
	while(!line) {
		line = prompt(message, example).trim().toLowerCase();
	}
	return line + "";
}