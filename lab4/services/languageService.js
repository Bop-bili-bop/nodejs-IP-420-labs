const languageRepository = require('../repositories/languageRepository');

class LanguageService {
    constructor(repository = languageRepository) {
        this.repository = repository;
    }

    findAll() {
        return this.repository.findAll();
    }

    findOne(id) {
        return this.repository.findOne(id);
    }

    create(data) {
        if (!data.name) {
            throw new Error("Language name is required");
        }

        return this.repository.create(data);
    }

    update(id, data) {
        if (!id) {
            throw new Error("Language ID is required");
        }

        if (!data.name) {
            throw new Error("Language name is required");
        }

        const language = this.repository.update(id, data);

        if (!language) {
            throw new Error("Language not found");
        }

        return language;
    }

    delete(id) {
        if (!id) {
            throw new Error("Language ID is required");
        }

        const language = this.repository.delete(id);

        if (!language) {
            throw new Error("Language not found");
        }

        return language;
    }
}

module.exports = new LanguageService();