const languageRepository = require("../repositories/languageRepository");
const { sequelize } = require("../models");
const { parsePositiveInt } = require("../utils/helpers");
const { createHttpError } = require("../utils/errors");

class LanguageService {
  async findAll() {
    return await languageRepository.findAll();
  }

  async findOne(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Language id must be a positive integer", 400);

    const language = await languageRepository.findOne(parsedId);
    if (!language) throw createHttpError("Language not found", 404);

    return language;
  }

  async create(data) {
    if (!data?.name || String(data.name).trim() === "") {
      throw createHttpError("Language name is required", 400);
    }

    return await sequelize.transaction(async (t) => {
      return await languageRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Language id must be a positive integer", 400);

    return await sequelize.transaction(async (t) => {
      return await languageRepository.update(parsedId, data, { transaction: t });
    });
  }

  async delete(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId)
      throw createHttpError("Language id must be a positive integer", 400);

    return await sequelize.transaction(async (t) => {
      return await languageRepository.delete(parsedId, { transaction: t });
    });
  }
}

module.exports = new LanguageService();
