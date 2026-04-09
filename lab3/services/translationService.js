const wordRepository = require('../repositories/wordRepository');
const translationRepository = require('../repositories/translationRepository');

class TranslationService {
    constructor(wordRepo = wordRepository, translationRepo = translationRepository) {
        this.wordRepository = wordRepo;
        this.translationRepository = translationRepo;
    }

    async findAll() {
        return await this.translationRepository.findAll();
    }

    async findOne(id) {
        return await this.translationRepository.findOne(id);
    }

    async create(data) {
        if (!data.dictionaryId || !data.sourceWordId || !data.targetWordId) {
            throw new Error("Translation dictionaryId, sourceWordId and targetWordId are required");
        }
        return await this.translationRepository.create(data);
    }

    async update(id, data) {
        if (!id) {
            throw new Error("Translation ID is required");
        }
        const result = await this.translationRepository.update(id, data);
        if (!result) {
            throw new Error("Translation not found");
        }
        return result;
    }

    async delete(id) {
        if (!id) {
            throw new Error("Translation ID is required");
        }
        const result = await this.translationRepository.delete(id);
        if (!result) {
            throw new Error("Translation not found");
        }
        return result;
    }

    async translate(wordText, targetLangId) {
        const [words, translations] = await Promise.all([
            this.wordRepository.findAll(),
            this.translationRepository.findAll(),
        ]);

        const sourceWord = words.find(
            w => w.text.toLowerCase() === String(wordText).toLowerCase()
        );
        if (!sourceWord) return null;

        const translationEntry = translations.find(
            t => t.sourceWordId === sourceWord.id
        );
        if (!translationEntry) return null;

        const targetWord = words.find(w => w.id === translationEntry.targetWordId);
        if (!targetWord) return null;

        if (targetLangId && targetWord.langId !== parseInt(targetLangId)) {
            return null;
        }

        return targetWord.text;
    }
}

module.exports = new TranslationService();