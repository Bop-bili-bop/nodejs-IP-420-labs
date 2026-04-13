const { readJsonSync } = require('../utils/fileLoaders');
const path = require('path');
const fs = require('fs');

const dataPath = path.join('data', 'languages.json');

class LanguageRepository {
	constructor() {}

	findAll() {
		return readJsonSync(dataPath);
	}

	findOne(id) {
		const items = this.findAll();
		return items.find(x => x.id === parseInt(id)) || null;
	}

	create(language) {
		const items = this.findAll();

		const newLanguage = {
		id: Date.now(),
		name: language.name
		};

		items.push(newLanguage);

		fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

		return newLanguage;
	}

	update(id, language) {
		const items = this.findAll();
		const index = items.findIndex(x => x.id === parseInt(id));

		if (index === -1) {
			return null;
		}

		const updatedLanguage = {
			...items[index],
			name: language.name || items[index].name
		};

		items[index] = updatedLanguage;
		fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

		return updatedLanguage;
	}

	delete(id) {
		const items = this.findAll();
		const index = items.findIndex(x => x.id === parseInt(id));

		if (index === -1) {
			return null;
		}

		const deletedLanguage = items[index];
		items.splice(index, 1);

		fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

		return deletedLanguage;
	}
}

module.exports = new LanguageRepository();