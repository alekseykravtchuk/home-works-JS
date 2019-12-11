'use strict';

(function () {
  
  	var formDef1=
  	[ {label:'Разработчики:', kind: 'longtext', name: 'author'},
  	  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  	  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  	  {label:'Дата запуска сайта:',kind:'number',name:'startdate'},
  	  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  	  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  	  {label:'Рубрика каталога:',kind:'combo',name:'division',
  	    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  	  {label:'Размещение:',kind:'radio',name:'payment',
  	    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  	  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  	  {label:'Описание сайта:',kind:'memo',name:'description'},
  	  {label:'Опубликовать:',kind:'submit'},
  	];
  
  	let inputWidth = {
  	  	number: '80px',
  	  	shorttext: '200px',
  	  	longtext: '453px'
  	};
	
  	var form1 = document.createElement('form');
  	form1.setAttribute('id', 'formDef1');
  	form1.innerHTML = '<p>Для внесения вашего сайта в каталог, заполните форму:</p>'
	
  	buildForm(form1, formDef1);
  	document.body.appendChild(form1);
	
  	function buildForm (form, arr) {
  	  	var table = document.createElement('table');
		arr.forEach((element) => {
  	  	  	let row = document.createElement('tr');
  	  	  	let td = document.createElement('td');
  	  	  	td.innerHTML = element.label;
  	  	  	row.appendChild(td);
  	  	  	td = document.createElement('td');
  	  	  	let input = document.createElement('input');
			
  	  	  	let error = document.createElement('div');
  	  	  	error.className = 'error';
  	  	  	error.style.cssText = 'margin: 0 0 0 10px; color: red; font-style: italic; font-size: 0.8em';
			
  	  	  	switch(element.kind) {
  	  	  	  	case 'longtext':
  	  	  	  	case 'number':
  	  	  	  	case 'shorttext':
  	  	  	  	  	input.setAttribute('type', 'text');
  	  	  	  	  	input.setAttribute('name', element.name);
  	  	  	  	  	input.setAttribute('class', 'validate');
  	  	  	  	  	input.style.width = inputWidth[element.kind];
  	  	  	  	  	td.appendChild(error);
  	  	  	  	  	td.appendChild(input);
  	  	  	  	break;
  	  	  	  	case 'combo':
  	  	  	  	  	let select = document.createElement('select');
  	  	  	  	  	select.setAttribute('name', element.name);
  	  	  	  	  	select.style = 'width: 204px; margin-left: 2px;';
  	  	  	  	  	for(let variant of element.variants) {
  	  	  	  	  	  	let option = document.createElement('option');
  	  	  	  	  	  	option.setAttribute('value', variant.value);
  	  	  	  	  	  	option.innerHTML = variant.text;
  	  	  	  	  	  	select.appendChild(option);
  	  	  	  	  	}
  	  	  	  	  	select.lastChild.setAttribute('selected', '');
  	  	  	  	  	td.appendChild(select);
  	  	  	  	  	break;
  	  	  	  	case 'radio':
  	  	  	  	  	for(let variant of element.variants) {
  	  	  	  	  	  	input = document.createElement('input');
  	  	  	  	  	  	input.setAttribute('type', 'radio');
  	  	  	  	  	  	input.setAttribute('name', element.name);
  	  	  	  	  	  	input.setAttribute('value', variant.value);
  	  	  	  	  	  	input.className = 'variant';
  	  	  	  	  	  	let span = document.createElement('span');
  	  	  	  	  	  	span.innerHTML = variant.text;
  	  	  	  	  	  	span.style.cssText = 'padding: 0px 10px 0px 0px';
  	  	  	  	  	  	td.appendChild(input);
  	  	  	  	  	  	td.appendChild(span);            
  	  	  	  	  	}
  	 				td.querySelector('.variant').setAttribute('checked', '');
  	  	  	  	  	break;
  	  	  	  	case 'check':
  	  	  	  	  	input.setAttribute('type', 'checkbox');
  	  	  	  	  	input.setAttribute('name', element.name);
  	  	  	  	  	td.appendChild(input);
  	  	  	  	  	break;
  	  	  	  	case 'memo':
  	  	  	  	  	row.removeChild(row.lastChild);
  	  	  	  	  	td.setAttribute('colspan', '2');
  	  	  	  	  	td.innerHTML = element.label + '<br>';
  	  	  	  	  	let textarea = document.createElement('textarea');
  	  	  	  	  	textarea.setAttribute('name', element.name);
  	  	  	  	  	textarea.setAttribute('type', 'text');
  	  	  	  	  	textarea.setAttribute('class', 'validate');
  	  	  	  	  	textarea.style.cssText = 'width: 608px; height: 50px';
  	  	  	  	  	td.appendChild(error);
  	  	  	  	  	td.appendChild(textarea);
  	  	  	  	  	break;
  	  	  	  	case 'submit':
  	  	  	  	  	let value = element.label;
  	  	  	  	  	row.removeChild(row.lastChild);
  	  	  	  	  	input.setAttribute('type', 'submit');
 					input.setAttribute('id', 'submit');
  	  	  	  	  	input.setAttribute('value', value.substring(0, value.length - 1));
  	  	  	  	  	td.appendChild(input);
  	  	  	}
  	  	  	row.appendChild(td);      
  	  	  	table.appendChild(row);
  	  	});
		
  	  	form.setAttribute('method', 'POST');
  	  	form.setAttribute('action', '//fe.it-academy.by/TestForm.php');
  	  	form.setAttribute('target', '_blank');
  	  	form.appendChild(table);
  	}
	
  	//валидация формы
  	var form = document.forms[0];
  	var inputs = form.getElementsByClassName('validate');
  	for (let input of inputs) {
  		input.addEventListener('blur', (event) => {
  			event.preventDefault();
  			checkField(input);
  		});
  	}
	
  	form.addEventListener('submit', (event) => {
  		for (let input of inputs) {
  		 	checkField(input);
  		}
  		 
  		let activeErrors = form.getElementsByClassName('error active');
  		if (activeErrors.length > 0) {
  			activeErrors[0].nextSibling.focus();
  			event.preventDefault();
  		}
  	});
	
  	function checkField(input) {
  			let fieldName = input.name;
  			let value = input.value;
  			input.style.borderColor = 'red';
  			input.previousSibling.className = 'error active';
  			if(!input.value.trim()) {
  				input.previousSibling.innerHTML = 'Поле не может быть пустым.';
  	 		} else if (input.name == 'visitors' && !Number(input.value.trim())) {
  				input.previousSibling.innerHTML = 'Поле может иметь только цифры.';
  			} else if (input.name == 'email' && !validateEmail(input.value)) {
  				input.previousSibling.innerHTML = 'Неверный формат e-mail.';
  			} else if (input.name == 'startdate' && !validateDate(input.value)) {
  				input.previousSibling.innerHTML = 'Неверный формат даты. Введите дару в формате dd.mm.yyyy.';
  			} else {
  				input.previousSibling.innerHTML = '';
  				input.style.borderColor = '';
  				input.previousSibling.className = 'error';
  			}
  		}
	
  		function validateEmail(email) {
  			return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
		}
	
		function validateDate(date) {
			let arrD = date.split('.');
			let d = new Date(arrD[2], --arrD[1], arrD[0]);
  			return (d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0]);
		}

})();