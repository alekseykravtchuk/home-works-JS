"use strict";

var vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
var line = inputLine("Введите строку для подсчета русских гласных букв:", "Строка для подсчета русских гласных букв");
var vowelsInLine = { };

for(var i = 0; i < vowels.length; i++) {
	var counter = 0;
	for(var j = 0; j < line.length; j++) {
		if (vowels[i] == line[j]) {
			counter++;
		}
	}

	if(counter > 0) {
		vowelsInLine[vowels[i]] = counter;
	}
}

var outputLine = "Русские гласные буквы в cтроке:";
for (let k in vowelsInLine) {
  outputLine += (' ' + vowelsInLine[k] + '-' + k + ',');
}
console.log(outputLine.slice(0, outputLine.length - 1) + '.');

function inputLine(message, line) {
	do {
		line = prompt(message, line).trim().toLowerCase();
	} while(!line)
	return line + "";
}