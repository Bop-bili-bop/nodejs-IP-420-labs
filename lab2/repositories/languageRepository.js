const { loadSync } = require('../utils/dataLoader');

class LanguageRepository {
    constructor() {
        this.data = loadSync('languages.json');
    }

    findAll() {
        return this.data;
    }

    findByCode(code) {
        return this.data.find(l => l.code === code) || null;
    }

    create(data) {
        const newLanguage = { ...data };
        this.data.push(newLanguage);
        return newLanguage;
    }

    update(code, data) {
        const language = this.findByCode(code);
        if (!language) return null;

        Object.assign(language, data);
        return language;
    }

    delete(code) {
        const index = this.data.findIndex(l => l.code === code);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }
}

module.exports = new LanguageRepository();
