const { loadWithPromise } = require('../utils/dataLoader');

class WordRepository {
    constructor() {
        this.data = [];
    }

    init() {
        return loadWithPromise('words.json').then(data => {
            this.data = data;
        });
    }

    findAll() {
        return this.data;
    }

    findById(id) {
        return this.data.find(w => w.id === id) || null;
    }

    findByDictionaryId(dictionaryId) {
        return this.data.filter(w => w.dictionaryId === dictionaryId);
    }

    search(query, dictionaryId) {
        const lowerQuery = query.toLowerCase();
        return this.data.filter(
            w => w.dictionaryId === dictionaryId &&
                w.text.toLowerCase().includes(lowerQuery)
        );
    }

    create(data) {
        const newWord = {
            id: this.data.length > 0 ? Math.max(...this.data.map(w => w.id)) + 1 : 1,
            ...data,
        };
        this.data.push(newWord);
        return newWord;
    }

    update(id, data) {
        const word = this.findById(id);
        if (!word) return null;

        Object.assign(word, data);
        return word;
    }

    delete(id) {
        const index = this.data.findIndex(w => w.id === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }
}

module.exports = new WordRepository();
