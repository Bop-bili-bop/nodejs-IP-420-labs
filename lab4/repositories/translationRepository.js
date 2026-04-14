const { readJsonAsync } = require('../utils/fileLoaders');
const path = require('path');
const fs = require('fs');

const dataPath = path.join('data', 'translations.json');

class TranslationRepository {
	constructor() {}

	async findAll() {
		return await readJsonAsync(dataPath);
	}

	async findOne(id) {
		const items = await this.findAll();
		return items.find(x => x.id === parseInt(id)) || null;
	}

	async create(translation) {
		const items = await this.findAll();

		const newTranslation = {
			id: Date.now(),
			dictionaryId: translation.dictionaryId,
			sourceWordId: translation.sourceWordId,
			targetWordId: translation.targetWordId
		};

		items.push(newTranslation);
		fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

		return newTranslation;
	}

	async update(id, translation) {
		const items = await this.findAll();
		const index = items.findIndex(x => x.id === parseInt(id));

		if (index === -1) return null;

		const updatedTranslation = {
			...items[index],
			dictionaryId: translation.dictionaryId || items[index].dictionaryId,
			sourceWordId: translation.sourceWordId || items[index].sourceWordId,
			targetWordId: translation.targetWordId || items[index].targetWordId
		};

		items[index] = updatedTranslation;
		fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

		return updatedTranslation;
	}

	async delete(id) {
		const items = await this.findAll();
		const index = items.findIndex(x => x.id === parseInt(id));

		if (index === -1) return null;

		const deletedTranslation = items[index];
		items.splice(index, 1);

		fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

		return deletedTranslation;
	}
}

module.exports = new TranslationRepository();