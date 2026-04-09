const { readJsonCallback } = require('../utils/fileLoaders');
const path = require('path');
const fs = require('fs');

const dataPath = path.join('data', 'dictionaries.json');

class DictionaryRepository {
    constructor() { }

    findAll(callback) {
        readJsonCallback(dataPath, callback);
    }

    findOne(id, callback) {
        this.findAll((err, items) => {
            if (err) return callback(err, null);
            const found = items.find(x => x.id === parseInt(id)) || null;
            callback(null, found);
        });
    }

    create(dictionary, callback) {
        this.findAll((err, items) => {
            if (err) return callback(err, null);

            const newDictionary = {
                id: Date.now(),
                name: dictionary.name,
                sourceLangId: dictionary.sourceLangId,
                targetLangId: dictionary.targetLangId
            };

            items.push(newDictionary);
            fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

            callback(null, newDictionary);
        });
    }

    update(id, dictionary, callback) {
        this.findAll((err, items) => {
            if (err) return callback(err, null);

            const index = items.findIndex(x => x.id === parseInt(id));
            if (index === -1) return callback(null, null);

            const updatedDictionary = {
                ...items[index],
                name: dictionary.name || items[index].name,
                sourceLangId: dictionary.sourceLangId || items[index].sourceLangId,
                targetLangId: dictionary.targetLangId || items[index].targetLangId
            };

            items[index] = updatedDictionary;
            fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

            callback(null, updatedDictionary);
        });
    }

    delete(id, callback) {
        this.findAll((err, items) => {
            if (err) return callback(err, null);

            const index = items.findIndex(x => x.id === parseInt(id));
            if (index === -1) return callback(null, null);

            const deletedDictionary = items[index];
            items.splice(index, 1);

            fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

            callback(null, deletedDictionary);
        });
    }
}

module.exports = new DictionaryRepository();