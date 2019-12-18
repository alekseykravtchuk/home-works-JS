 "use strict";
class HashStorageFunc {
	constructor() {
		this.drinks = {};
	}

	addValue(key,value) {
		drinks.key = value;
	}

	getValue(key) {
		return drinks.key;
	}

	deleteValue(key) {
		return delete drinks.key;
	}

	getKeys() {
		return Object.keys(drinks);
	}
}