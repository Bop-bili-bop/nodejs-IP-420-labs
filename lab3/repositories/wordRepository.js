const { readJsonPromise } = require('../utils/fileLoaders');
const path = require('path');
const fs = require('fs');

const dataPath = path.join('data', 'words.json');

class WordRepository {
	constructor() {}

	findAll() {
		return readJsonPromise(dataPath);
	}

	findOne(id) {
		return this.findAll().then(items => items.find(x => x.id === parseInt(id)) || null);
	}

	create(word) {
		return this.findAll().then(items => {
			const newWord = {
				id: Date.now(),
				text: word.text,
				langId: word.langId
			};

			items.push(newWord);
			fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

			return newWord;
		});
	}

	update(id, word) {
		return this.findAll().then(items => {
			const index = items.findIndex(x => x.id === parseInt(id));
			if (index === -1) return null;

			const updatedWord = {
				...items[index],
				text: word.text || items[index].text,
				langId: word.langId || items[index].langId
			};

			items[index] = updatedWord;
			fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

			return updatedWord;
		});
	}

	delete(id) {
		return this.findAll().then(items => {
			const index = items.findIndex(x => x.id === parseInt(id));
			if (index === -1) return null;

			const deletedWord = items[index];
			items.splice(index, 1);

			fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

			return deletedWord;
		});
	}
}

module.exports = new WordRepository();
