const languageRepository = require('../repositories/languageRepository');

class LanguageService {
    async getLanguages() {
        return languageRepository.findAll();
    }

    async getLanguageByCode(code) {
        const language = languageRepository.findByCode(code);

        if (!language) {
            throw new Error('Language not found');
        }

        return language;
    }

    async createLanguage(name, code) {
        if (languageRepository.findByCode(code)) {
            throw new Error('Language already exists');
        }

        return languageRepository.create({ name, code });
    }

    async updateLanguage(code, newName, newCode) {
        await this.getLanguageByCode(code);

        return languageRepository.update(code, { name: newName, code: newCode });
    }

    async deleteLanguage(code) {
        await this.getLanguageByCode(code);

        languageRepository.delete(code);
    }
}

module.exports = LanguageService;
