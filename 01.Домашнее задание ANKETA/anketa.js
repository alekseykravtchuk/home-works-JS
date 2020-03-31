var surname;
var firstName;
var patronymic;
var age;
var gender;
var line;
var isRetired;

surname = inputLine("Enter your surname:", "Ivanov");
firstName = inputLine("Enter your name:", "Ivan");
patronymic = inputLine("Enter your patronymic:", "Ivanovich");

age = inputNumber("Enter your age:");

gender = confirm("You are a man?") ? "male" : "woman";

if(gender == "male") {
	isRetired = (age >= 61.5);
} else {
	isRetired = (age >= 56.5);
}

line = "Your full name: " + surname + " " + firstName + " " + patronymic + "\n";
line += "Your age in years: " + age + "\n";
line += "Your age in days: " + (age * 365) + "\n";
line += "After 5 years you will be " + (+age + 5) + " years old." + "\n";
line += "Your gender: " + gender  + "\n";
line += "You are retired: " + (isRetired ? "yes" : "no");

console.log(line);
document.body.append(document.createElement('p'));
let paragraph = document.querySelector('p');
paragraph.setAttribute('style', 'margin: 5em auto; width: 16em');
paragraph.innerText = line;

function inputLine(message, example) {
	var line;
	while(!line) {
		line = prompt(message, example);
	}
	return line;
}

function inputNumber(message) {
	var number;
	while((!isFinite(number)) || (number <= 0)) {
		number = prompt(message);
	}
	return +number;
}
