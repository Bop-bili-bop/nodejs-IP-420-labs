const dictionaryRepository = require('../repositories/dictionaryRepository');

class DictionaryService {
    async getDictionaries() {
        return dictionaryRepository.findAll();
    }

    async getDictionaryById(id) {
        const dictionary = dictionaryRepository.findById(id);

        if (!dictionary) {
            throw new Error('Dictionary not found');
        }

        return dictionary;
    }

    async selectDictionary(fromLanguageCode, toLanguageCode) {
        const dictionary = dictionaryRepository.findByLanguagePair(fromLanguageCode, toLanguageCode);

        if (!dictionary) {
            throw new Error(`No dictionary found for language pair: ${fromLanguageCode} → ${toLanguageCode}`);
        }

        return dictionary;
    }

    async createDictionary(name, fromLanguageCode, toLanguageCode) {
        const existing = dictionaryRepository.findByLanguagePair(fromLanguageCode, toLanguageCode);

        if (existing) {
            throw new Error('Dictionary for this language pair already exists');
        }

        return dictionaryRepository.create({ name, fromLanguageCode, toLanguageCode });
    }

    async updateDictionary(id, name) {
        await this.getDictionaryById(id);

        return dictionaryRepository.update(id, { name });
    }

    async deleteDictionary(id) {
        await this.getDictionaryById(id);

        dictionaryRepository.delete(id);
    }
}

module.exports = DictionaryService;
