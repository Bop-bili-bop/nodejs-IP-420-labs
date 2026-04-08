const { loadWithAsync } = require('../utils/dataLoader');

class TranslationRepository {
    constructor() {
        this.data = [];
    }

    async init() {
        this.data = await loadWithAsync('translations.json');
    }

    findAll() {
        return this.data;
    }

    findById(id) {
        return this.data.find(t => t.id === id) || null;
    }

    findByWordId(wordId) {
        return this.data.filter(t => t.wordId === wordId);
    }

    create(data) {
        const newTranslation = {
            id: this.data.length > 0 ? Math.max(...this.data.map(t => t.id)) + 1 : 1,
            ...data,
        };
        this.data.push(newTranslation);
        return newTranslation;
    }

    update(id, data) {
        const translation = this.findById(id);
        if (!translation) return null;

        Object.assign(translation, data);
        return translation;
    }

    delete(id) {
        const index = this.data.findIndex(t => t.id === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }
}

module.exports = new TranslationRepository();
