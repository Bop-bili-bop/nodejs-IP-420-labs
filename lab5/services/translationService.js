const WordRepository = require('../repositories/wordRepository');
const TranslationRepository = require('../repositories/translationRepository');
const sequelize = require('../db/sequelize');

class TranslationService {
  constructor() {
    this.wordRepository = new WordRepository();
    this.translationRepository = new TranslationRepository();
  }

  async findAll() {
    return this.translationRepository.findAll();
  }

  async findOne(id) {
    return this.translationRepository.findOne(id);
  }

  async create(data) {
    if (!data.dictionaryId || !data.sourceWordId || !data.targetWordId) {
      throw new Error("Translation dictionaryId, sourceWordId and targetWordId are required");
    }
    return this.translationRepository.create(data);
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
    const t = await sequelize.transaction();
    try {
      const wordRepo = new WordRepository(t);
      const translationRepo = new TranslationRepository(t);

      const sourceWord = await wordRepo.create({
        text: sourceWordData.text,
        langId: sourceWordData.langId,
        description: sourceWordData.description || "",
      });

      const targetWord = await wordRepo.create({
        text: targetWordData.text,
        langId: targetWordData.langId,
        description: targetWordData.description || "",
      });

      const translation = await translationRepo.create({
        dictionaryId,
        sourceWordId: sourceWord.id,
        targetWordId: targetWord.id,
      });

      await t.commit();
      return { sourceWord, targetWord, translation };
    } catch (error) {
      await t.rollback();
      throw new Error(`Транзакцію скасовано через помилку: ${error.message}`);
    }
  }
}

module.exports = new TranslationService();
