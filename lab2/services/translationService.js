const translationRepository = require('../repositories/translationRepository');
const wordRepository = require('../repositories/wordRepository');

class TranslationService {
    async getTranslations(wordId) {
        this.#ensureWordExists(wordId);

        return translationRepository.findByWordId(wordId);
    }

    async getTranslationById(id) {
        const translation = translationRepository.findById(id);

        if (!translation) {
            throw new Error('Translation not found');
        }

        return translation;
    }

    async translate(wordId) {
        this.#ensureWordExists(wordId);

        const translations = translationRepository.findByWordId(wordId);

        if (translations.length === 0) {
            throw new Error('No translations found for this word');
        }

        return translations;
    }

    async createTranslation(wordId, translatedText) {
        this.#ensureWordExists(wordId);

        return translationRepository.create({ wordId, translatedText });
    }

    async updateTranslation(id, translatedText) {
        await this.getTranslationById(id);

        return translationRepository.update(id, { translatedText });
    }

    async deleteTranslation(id) {
        await this.getTranslationById(id);

        translationRepository.delete(id);
    }

    #ensureWordExists(wordId) {
        const word = wordRepository.findById(wordId);

        if (!word) {
            throw new Error('Word not found');
        }
    }
}

module.exports = TranslationService;
