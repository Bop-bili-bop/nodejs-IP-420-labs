const WordRepository = require('../repositories/wordRepository');
const TranslationRepository = require('../repositories/translationRepository');
const UnitOfWork = require('../db/UnitOfWork');

class TranslationService {
    constructor() {
        this.wordRepository = new WordRepository();
        this.translationRepository = new TranslationRepository();
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
        if (!id) throw new Error("Translation ID is required");
        const result = await this.translationRepository.update(id, data);
        if (!result) throw new Error("Translation not found");
        return result;
    }

    async delete(id) {
        if (!id) throw new Error("Translation ID is required");
        const result = await this.translationRepository.delete(id);
        if (!result) throw new Error("Translation not found");
        return result;
    }

    async translate(wordText, targetLangId) {
        const [words, translations] = await Promise.all([
            this.wordRepository.findAll(),
            this.translationRepository.findAll(),
        ]);

        const sourceWord = words.find(w => w.text.toLowerCase() === String(wordText).toLowerCase());
        if (!sourceWord) return null;

        const translationEntry = translations.find(t => t.sourceWordId === sourceWord.id);
        if (!translationEntry) return null;

        const targetWord = words.find(w => w.id === translationEntry.targetWordId);
        if (!targetWord) return null;

        if (targetLangId && targetWord.langId !== parseInt(targetLangId)) return null;

        return targetWord.text;
    }

    async addWordWithTranslationAtomically(sourceWordData, targetWordData, dictionaryId) {
        const uow = new UnitOfWork();
        await uow.start(); 

        try {
            const client = uow.getClient();

            const transactionalWordRepo = new WordRepository(client);
            const transactionalTranslationRepo = new TranslationRepository(client);

            const sourceWord = await transactionalWordRepo.create({
                text: sourceWordData.text,
                langId: sourceWordData.langId,
                description: sourceWordData.description || ""
            });

            const targetWord = await transactionalWordRepo.create({
                text: targetWordData.text,
                langId: targetWordData.langId,
                description: targetWordData.description || ""
            });

            const translation = await transactionalTranslationRepo.create({
                dictionaryId: dictionaryId,
                sourceWordId: sourceWord.id,
                targetWordId: targetWord.id
            });

            await uow.commit(); 
            
            return { sourceWord, targetWord, translation };

        } catch (error) {
            await uow.rollback(); 
            throw new Error(`Транзакцію скасовано через помилку: ${error.message}`);
        }
    }

}

module.exports = new TranslationService();