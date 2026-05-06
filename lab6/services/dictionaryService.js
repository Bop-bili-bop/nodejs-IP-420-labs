const dictionaryRepository = require("../repositories/dictionaryRepository");
const { sequelize } = require("../models");
const { parsePositiveInt } = require("../utils/helpers");
const { createHttpError } = require("../utils/errors");

class DictionaryService {
  async findAll() {
    return await dictionaryRepository.findAll();
  }

  async findOne(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Dictionary id must be a positive integer", 400);

    const dictionary = await dictionaryRepository.findOne(parsedId);
    if (!dictionary) throw createHttpError("Dictionary not found", 404);

    return dictionary;
  }

  async create(data) {
    if (!data?.name || String(data.name).trim() === "") {
      throw createHttpError("Dictionary name is required", 400);
    }

    return await sequelize.transaction(async (t) => {
      return await dictionaryRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Dictionary id must be a positive integer", 400);

    return await sequelize.transaction(async (t) => {
      return await dictionaryRepository.update(parsedId, data, { transaction: t });
    });
  }

  async delete(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Dictionary id must be a positive integer", 400);

    return await sequelize.transaction(async (t) => {
      return await dictionaryRepository.delete(parsedId, { transaction: t });
    });
  }
}

module.exports = new DictionaryService();
