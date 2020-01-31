class LocalStorage {
	constructor(){
		this.name = null;
	}
	
	init(name, view) {
		this.name = name;
		this.view = view;
		this.status = null;
		this.info = '';
	}
	
	addValue(key, value) {
		if(key.length < 3 || value.length < 3) {
			this.info = 'Invalid entry';
		} else {
			let recipeJSON = JSON.stringify(value);
			localStorage[`${key}_${this.name}`] = recipeJSON;
			this.info = `The recipe for ${key} successfully saved`;
		}
		this.status = 'show-info';
		this.update();
	}
	
	getValue(key) {
		if(!key || key.lenght < 3) {
			this.info = 'Invalid entry';
		} else if(!localStorage[`${key}_${this.name}`]) {
			this.info = `The recipe for ${key} not found.`;
		} else {
			let recipeJSON = localStorage[`${key}_${this.name}`];
			this.info = `The recipe for ${key}: \n` + JSON.parse(recipeJSON);
		}
		this.status = 'show-info';
		this.update();
	}
	
	deleteValue(key) {
		if(!key || key.lenght < 3) {
			this.info = 'Invalid entry'; 
		} else if(localStorage[`${key}_${this.name}`]) {
			localStorage.removeItem(`${key}_${this.name}`);
			this.info = `The recipe for ${key} deleted.`;
		} else 
			this.info = `The recipe for ${key} not found.`;
			
		this.status = 'show-info';
		this.update();
	}
	
	getKeys() {
		let keys = Object.keys(localStorage);
		keys.forEach((key) => {
			key = key.split('_');
			if (key[1] == this.name) {
				this.info += `${key[0]}\n`;
			}
		});
		if(!this.info) {
			this.info = `No recipes found.`;
		}
		this.status = 'show-info';
		this.update();
	}
	
	update() {
		this.view.update();
		this.info = '';
	}
}

class StorageView {
	constructor() {
		this.model = null;
		this.container = null;
	}
	
	init(model, container) {
		this.model = model;
		this.container = container;
		this.update();
	}
	
	update() {
		this.container.innerHTML = '';
		
		let h2 = document.createElement('h2');
		h2.innerText = `The storage of recipes for  ${this.model.name}`;
		this.container.appendChild(h2);
		
		let addButton = document.createElement('button');
		addButton.setAttribute('id', 'add-value-btn');
		addButton.innerText = `Add new recipe`;
		this.container.appendChild(addButton);
		
		let getButton = document.createElement('button');
		getButton.setAttribute('id', 'get-value-btn');
		getButton.innerText = `Get recipe`;
		this.container.appendChild(getButton);
		
		let removeButton = document.createElement('button');
		removeButton.setAttribute('id', 'remove-value-btn');
		removeButton.innerText = `Remove recipe`;
		this.container.appendChild(removeButton);
		
		let showButton = document.createElement('button');
		showButton.setAttribute('id', 'show-items-btn');
		showButton.innerText = `Show all recipes`;
		this.container.appendChild(showButton);
		
		let status = this.model.status
		if(status) {
			let infoSection = document.createElement('section');
			infoSection.id = 'info';
			
			if(status == 'add-value'|| status == 'get-value' || status == 'remove-value') {
				let recipeName = document.createElement('div');
				recipeName.id = 'recipe-name';
				recipeName.innerHTML = `<input type='text' placeholder='Recipe name'>`;
				infoSection.appendChild(recipeName);
			}
			
			let components = document.createElement('div');
			components.id = 'components';
			if(status == 'add-value' || status == 'show-info') {
				components.innerHTML = `<textarea type='text' placeholder='Components'>${this.model.info}</textarea>`;	
			}
			infoSection.appendChild(components);
			
			let confirmButton = document.createElement('button');
			confirmButton.id = 'confirm-btn';
			confirmButton.innerText = 'OK';
				
			infoSection.appendChild(confirmButton);
			this.container.appendChild(infoSection);
		}
	}
}

class StorageController {
	constructor() {
		this.model = null;
		this.container = null;
	}
	
	init(model, container){
		this.model = model;
		this.container = container;
		this.container.addEventListener('click', this.addClickEvent);
	}
	
	addClickEvent = (e) => {
		if(e.target.id == 'add-value-btn') {
			console.log('add-value-btn click: ' + this.model.name);
			let section = this.container.querySelector('section');
			this.model.status = 'add-value';
			this.model.update();
		}
		else if(e.target.id == 'get-value-btn') {
			console.log('get-value-btn click: ' + this.model.name);
			this.model.status = 'get-value';
			this.model.update();
		}
		else if(e.target.id == 'remove-value-btn') {
			console.log('remove-value-btn click: ' + this.model.name);
			this.model.status = 'remove-value';
			this.model.update();
		}
		else if(e.target.id == 'show-items-btn') {
			console.log('show-items-btn click: ' + this.model.name);
			this.model.getKeys();
		} else if(e.target.id == 'confirm-btn') {
			switch (this.model.status) {
				case 'add-value':
					let addKeyBox = this.container.querySelector('#recipe-name input');
					let componentsBox = this.container.querySelector('#components textarea');
					this.model.addValue(addKeyBox.value.trim(), componentsBox.value.trim());
					break;
				case 'get-value':
					let getKeyBox = this.container.querySelector('#recipe-name input');
					this.model.getValue(getKeyBox.value.trim());
					break;
				case 'remove-value':
					let deleteKeyBox = this.container.querySelector('#recipe-name input');
					this.model.deleteValue(deleteKeyBox.value.trim());
					break;
				case 'show-info': 
					this.model.status = null;
					this.model.update();
			}
		}
	}
}


class StorageFactory {
	create(name, container) {
		let storage = new LocalStorage();
		let view = new StorageView();
		let controller = new StorageController();
		storage.init(name, view);
		view.init(storage, container);
		controller.init(storage, container);
	}
}
	
const factory = new StorageFactory();

let drinksContainer = document.getElementById('drinks');
factory.create('drinks', drinksContainer);

let dishesContainer = document.getElementById('dishes');
factory.create('dishes', dishesContainer);



localStorage["Espresso Martini_drinks"] = JSON.stringify("ice cubes\n200ml vodka\n100ml freshly brewed espresso\n100ml Kahlúa\n4 coffee beans, to garnish");
localStorage["Borscht_dishes"] = JSON.stringify("300-400 g beef\n1.5 kg cabbage\n3-4 potatoes\n1-2 carrots\n1 onion\n1 beetroot\n2 bay leaves\n1.5-2 l water\n100 ml sour cream\nsalt and pepper to taste");
localStorage["Sweet Sailor_drinks"] = JSON.stringify("Favourite choice of gin\nGrapefruit\nHoney\nCubed ice\nSchweppes 1783 Salty Lemon Tonic Water\nSprig of rosemary");
localStorage["Draniki_dishes"] = JSON.stringify("You need grated potato, onions, salt, and enough vegetable oil to fry each draniki to a golden brown.\nDraniki are usually served with sour cream.");
localStorage["Babka_dishes"] = JSON.stringify("“Morning” babka uses potato dough made with grated potatoes, meat, salt, and onions. All ingredients are mixed well, poured into a greased frying pan, and baked in an oven for about an hour. For “dinner” babka, the same ingredients are fried on a stove over low heat. The finished dish is served on its own or with sour cream on the side.");
localStorage["Blueberry and Lemon Hotcakes_dishes"] = JSON.stringify("1 cup brown rice flour\n½ cup ground almonds (almond meal)\n1 tablespoon cornflour\n2 teaspoons baking powder\n½ cup caster sugar\n½ teaspoon sea salt\n1 cup buttermilk\n2 large eggs, size 7\n1 tablespoon rice bran oil\nfinely grated zest 1 large lemon\n1 teaspoon vanilla extract\n1 punnet blueberries\nbutter or vegetable oil for cooking");
localStorage["Kletski_dishes"] = JSON.stringify("The dish consists of small potato balls boiled in water or milk, and some recipes include meat and onions. Kletski can be served as soup, eaten on its own, or served with sour cream on top.");