const { Word } = require("../models");
const { createHttpError } = require("../utils/errors");

class WordRepository {
  async findAll(options = {}) {
    return await Word.findAll(options);
  }

  async findAndCountAll(options = {}) {
    return await Word.findAndCountAll(options);
  }

  async findOne(id, options = {}) {
    if (!id) throw createHttpError("ID слова є обов'язковим для пошуку", 400);
    return await Word.findByPk(id, options);
  }

  async findByCondition(options = {}) {
    return await Word.findOne(options);
  }

  async create(data, options = {}) {
    return await Word.create(data, options);
  }

  async update(id, data, options = {}) {
    if (!id) throw createHttpError("ID слова є обов'язковим для оновлення", 400);
    if (!data || Object.keys(data).length === 0)
      throw createHttpError("Дані для оновлення не надані", 400);

    const word = await this.findOne(id, options);
    if (!word) {
      throw createHttpError(`Слово з ID ${id} не знайдено`, 404);
    }

    return await word.update(data, options);
  }

  async delete(id, options = {}) {
    if (!id) throw createHttpError("ID слова є обов'язковим для видалення", 400);

    const word = await this.findOne(id, options);
    if (!word) {
      throw createHttpError(`Слово з ID ${id} не знайдено`, 404);
    }

    await word.destroy(options);
    return true;
  }
}

module.exports = new WordRepository();
