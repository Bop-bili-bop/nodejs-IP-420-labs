const wordRepository = require("../repositories/wordRepository");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const { parsePositiveInt } = require("../utils/helpers");
const { createHttpError } = require("../utils/errors");

class WordService {
  async findAll(query = {}) {
    const page = parsePositiveInt(query.page, 1);
    const limit = parsePositiveInt(query.limit, 10);
    const offset = (page - 1) * limit;

    const where = {};

    if (query.langId !== undefined) {
      const langId = parsePositiveInt(query.langId);
      if (!langId) throw createHttpError("langId must be a positive integer", 400);
      where.langId = langId;
    }

    if (query.text !== undefined && String(query.text).trim() !== "") {
      where.text = { [Op.iLike]: `%${String(query.text).trim()}%` };
    }

    const { rows, count } = await wordRepository.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return {
      items: rows,
      meta: {
        total: count,
        page,
        pages: Math.ceil(count / limit) || 1,
        limit,
      },
    };
  }

  async findOne(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId) throw createHttpError("Word id must be a positive integer", 400);
    const word = await wordRepository.findOne(parsedId);
    if (!word) throw createHttpError("Слово не знайдено", 404);
    return word;
  }

  async create(data) {
    if (!data?.text || !data?.langId) {
      throw createHttpError("Word text and langId are required", 400);
    }
    return await sequelize.transaction(async (t) => {
      return await wordRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId) throw createHttpError("Word id must be a positive integer", 400);
    return await sequelize.transaction(async (t) => {
      return await wordRepository.update(parsedId, data, { transaction: t });
    });
  }

  async delete(id) {
    const parsedId = parsePositiveInt(id);
    if (!parsedId) throw createHttpError("Word id must be a positive integer", 400);
    return await sequelize.transaction(async (t) => {
      return await wordRepository.delete(parsedId, { transaction: t });
    });
  }
}

module.exports = new WordService();
