"use strict";

class VowelsInLine {
	constructor (line) {
		this.line = line;
	}
	
	vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];

	countVowels() {
		for (var i = 0; i < this.vowels.length; i++) {
			var counter = this.line.split(this.vowels[i]).length - 1;
			if (counter > 0) {
				console.log(this.vowels[i] + "-" + counter);
			}
		}
	}

}

var getLine = () => inputLine("Введите строку для подсчета русских гласных букв:", "Строка для подсчета русских гласных букв");

var inputLine = (message, line) => {
	do {
		line = prompt(message, line).trim().toLowerCase();
	} while(!line)
	return line + "";
}


var vowelsInLine = new VowelsInLine(getLine());
vowelsInLine.countVowels();