const wordRepository = require('../repositories/wordRepository');
const dictionaryRepository = require('../repositories/dictionaryRepository');

class WordService {
    async getWords(dictionaryId) {
        this.#ensureDictionaryExists(dictionaryId);

        return wordRepository.findByDictionaryId(dictionaryId);
    }

    async getWordById(id) {
        const word = wordRepository.findById(id);

        if (!word) {
            throw new Error('Word not found');
        }

        return word;
    }

    async searchWords(query, dictionaryId) {
        this.#ensureDictionaryExists(dictionaryId);

        const results = wordRepository.search(query, dictionaryId);

        if (results.length === 0) {
            throw new Error(`No words matching "${query}" found in this dictionary`);
        }

        return results;
    }

    async createWord(dictionaryId, text) {
        this.#ensureDictionaryExists(dictionaryId);

        const existing = wordRepository.findByDictionaryId(dictionaryId)
            .find(w => w.text.toLowerCase() === text.toLowerCase());

        if (existing) {
            throw new Error('Word already exists in this dictionary');
        }

        return wordRepository.create({ dictionaryId, text });
    }

    async updateWord(id, text) {
        await this.getWordById(id);

        return wordRepository.update(id, { text });
    }

    async deleteWord(id) {
        await this.getWordById(id);

        wordRepository.delete(id);
    }

    #ensureDictionaryExists(dictionaryId) {
        const dictionary = dictionaryRepository.findById(dictionaryId);

        if (!dictionary) {
            throw new Error('Dictionary not found');
        }
    }
}

module.exports = WordService;
