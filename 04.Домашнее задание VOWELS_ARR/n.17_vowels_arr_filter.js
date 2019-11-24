"use strict";

var vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
var line = inputLine("Введите строку для подсчета русских гласных букв:", "Пример").split('');

var counter = line.filter(letter => vowels.includes(letter)).lenght;

console.log("Количество гласных букв: " + counter);

function inputLine(message, example) {
	var line;
	while(!line) {
		line = prompt(message, example).trim().toLowerCase();
	}
	return line + "";
}