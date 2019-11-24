"use strict";

var vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
var line = inputLine("Введите строку для подсчета русских гласных букв:");
var counter = 0;

for(var i = 0; i < vowels.length; i++) {
	for(var j = 0; j < line.length; j++) {
		if (vowels[i] == line[j]) {
			counter++;
		}
	}
}

console.log("Количество гласных букв: " + counter);

function inputLine(message) {
	var line;
	while(!line) {
		line = prompt(message).trim().toLowerCase();
	}
	return line + "";
}