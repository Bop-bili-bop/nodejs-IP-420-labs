const { loadWithCallback } = require('../utils/dataLoader');

class DictionaryRepository {
    constructor() {
        this.data = [];
    }

    init(callback) {
        loadWithCallback('dictionaries.json', (err, data) => {
            if (err) return callback(err);
            this.data = data;
            callback(null);
        });
    }

    findAll() {
        return this.data;
    }

    findById(id) {
        return this.data.find(d => d.id === id) || null;
    }

    findByLanguagePair(fromLanguageCode, toLanguageCode) {
        return this.data.find(
            d => d.fromLanguageCode === fromLanguageCode && d.toLanguageCode === toLanguageCode
        ) || null;
    }

    create(data) {
        const newDictionary = {
            id: this.data.length > 0 ? Math.max(...this.data.map(d => d.id)) + 1 : 1,
            ...data,
        };
        this.data.push(newDictionary);
        return newDictionary;
    }

    update(id, data) {
        const dictionary = this.findById(id);
        if (!dictionary) return null;

        Object.assign(dictionary, data);
        return dictionary;
    }

    delete(id) {
        const index = this.data.findIndex(d => d.id === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }
}

module.exports = new DictionaryRepository();
