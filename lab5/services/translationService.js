const translationRepository = require("../repositories/translationRepository");
const wordRepository = require("../repositories/wordRepository");
const { sequelize, Word } = require("../models");

class TranslationService {
  async findAll() {
    return await translationRepository.findAll();
  }

  async findOne(id) {
    return await translationRepository.findOne(id);
  }

  async create(data) {
    return await sequelize.transaction(async (t) => {
      return await translationRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    return await sequelize.transaction(async (t) => {
      return await translationRepository.update(id, data, { transaction: t });
    });
  }

  async delete(id) {
    return await sequelize.transaction(async (t) => {
      return await translationRepository.delete(id, { transaction: t });
    });
  }

  async translate(wordText, targetLangId) {
    const sourceWord = await wordRepository.findByCondition({
      where: sequelize.where(
        sequelize.fn("lower", sequelize.col("text")),
        String(wordText).toLowerCase(),
      ),
    });
    if (!sourceWord) return null;

    const translationEntry = await translationRepository.findByCondition({
      where: { sourceWordId: sourceWord.id },
    });
    if (!translationEntry) return null;

    const targetWord = await wordRepository.findOne(
      translationEntry.targetWordId,
    );
    if (!targetWord) return null;

    if (targetLangId && targetWord.langId !== parseInt(targetLangId)) {
      return null;
    }

    return targetWord.text;
  }

  async addWordWithTranslationAtomically(
    sourceWordData,
    targetWordData,
    dictionaryId,
    simulateError = false,
  ) {
    return await sequelize.transaction(async (t) => {
      const sourceWord = await wordRepository.create(
        {
          text: sourceWordData.text,
          langId: sourceWordData.langId,
          description: sourceWordData.description || "",
        },
        { transaction: t },
      );

      const targetWord = await wordRepository.create(
        {
          text: targetWordData.text,
          langId: targetWordData.langId,
          description: targetWordData.description || "",
        },
        { transaction: t },
      );

      if (simulateError) {
        throw new Error("Увага: Контрольований збій! Транзакція відкочується.");
      }

      const translation = await translationRepository.create(
        {
          dictionaryId: dictionaryId,
          sourceWordId: sourceWord.id,
          targetWordId: targetWord.id,
        },
        { transaction: t },
      );

      return { sourceWord, targetWord, translation };
    });
  }
}

module.exports = new TranslationService();
