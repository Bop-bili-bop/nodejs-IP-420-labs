const dictionaryRepository = require('../repositories/dictionaryRepository');

class DictionaryService {
    constructor(repository = dictionaryRepository) {
        this.repository = repository;
    }

    findAll(callback) {
        this.repository.findAll(callback);
    }

    findOne(id, callback) {
        this.repository.findOne(id, callback);
    }

    create(data, callback) {
        if (!data.name || !data.sourceLangId || !data.targetLangId) {
            return callback(new Error("Dictionary name, sourceLangId and targetLangId are required"), null);
        }
        this.repository.create(data, callback);
    }

    update(id, data, callback) {
        if (!id) {
            return callback(new Error("Dictionary ID is required"), null);
        }
        this.repository.update(id, data, (err, result) => {
            if (err) return callback(err, null);
            if (!result) return callback(new Error("Dictionary not found"), null);
            callback(null, result);
        });
    }

    delete(id, callback) {
        if (!id) {
            return callback(new Error("Dictionary ID is required"), null);
        }
        this.repository.delete(id, (err, result) => {
            if (err) return callback(err, null);
            if (!result) return callback(new Error("Dictionary not found"), null);
            callback(null, result);
        });
    }
}

module.exports = new DictionaryService();
