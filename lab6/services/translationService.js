const translationRepository = require("../repositories/translationRepository");
const wordRepository = require("../repositories/wordRepository");
const { sequelize } = require("../models");
const { parsePositiveInt } = require("../utils/helpers");
const { createHttpError } = require("../utils/errors");

class TranslationService {
  async findAll() {
    return await translationRepository.findAll();
  }

  async findOne(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Translation id must be a positive integer", 400);

    const translation = await translationRepository.findOne(parsedId);
    if (!translation) throw createHttpError("Translation not found", 404);

    return translation;
  }

  async create(data) {
    if (!data?.dictionaryId || !data?.sourceWordId || !data?.targetWordId) {
      throw createHttpError(
        "dictionaryId, sourceWordId and targetWordId are required",
        400,
      );
    }

    return await sequelize.transaction(async (t) => {
      return await translationRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Translation id must be a positive integer", 400);

    return await sequelize.transaction(async (t) => {
      return await translationRepository.update(parsedId, data, { transaction: t });
    });
  }

  async delete(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Translation id must be a positive integer", 400);

    return await sequelize.transaction(async (t) => {
      return await translationRepository.delete(parsedId, { transaction: t });
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

    const targetWord = await wordRepository.findOne(translationEntry.targetWordId);
    if (!targetWord) return null;

    if (targetLangId) {
      const parsedLangId = parsePositiveInt(targetLangId);
      if (!parsedLangId) {
        throw createHttpError("query param 'lang' must be a positive integer", 400);
      }
      if (targetWord.langId !== parsedLangId) {
        return null;
      }
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
