const wordRepository = require('../repositories/wordRepository');

class WordService {
	constructor(repository = wordRepository) {
		this.repository = repository;
	}

	findAll() {
		return this.repository.findAll()
			.then(data => data)
			.catch(err => Promise.reject(err));
	}

	findOne(id) {
		return this.repository.findOne(id)
			.then(data => data)
			.catch(err => Promise.reject(err));
	}

	create(data) {
		if (!data.text || !data.langId) {
			return Promise.reject(new Error("Word text and langId are required"));
		}
		return this.repository.create(data)
			.then(data => data)
			.catch(err => Promise.reject(err));
	}

	update(id, data) {
		if (!id) {
			return Promise.reject(new Error("Word ID is required"));
		}
		return this.repository.update(id, data)
			.then(result => {
				if (!result) throw new Error("Word not found");
				return result;
			})
			.catch(err => Promise.reject(err));
	}

	delete(id) {
		if (!id) {
			return Promise.reject(new Error("Word ID is required"));
		}
		return this.repository.delete(id)
			.then(result => {
				if (!result) throw new Error("Word not found");
				return result;
			})
			.catch(err => Promise.reject(err));
	}
}

module.exports = new WordService();

