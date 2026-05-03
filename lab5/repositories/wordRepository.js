const { Word } = require("../models");

class WordRepository {
  async findAll(options = {}) {
    return await Word.findAll(options);
  }

  async findOne(id, options = {}) {
    if (!id) throw new Error("ID слова є обов'язковим для пошуку");
    return await Word.findByPk(id, options);
  }

  async findByCondition(options = {}) {
    return await Word.findOne(options);
  }

  async create(data, options = {}) {
    return await Word.create(data, options);
  }

  async update(id, data, options = {}) {
    if (!id) throw new Error("ID слова є обов'язковим для оновлення");
    if (!data || Object.keys(data).length === 0)
      throw new Error("Дані для оновлення не надані");

    const word = await this.findOne(id, options);
    if (!word) {
      throw new Error(`Слово з ID ${id} не знайдено`);
    }

    return await word.update(data, options);
  }

  async delete(id, options = {}) {
    if (!id) throw new Error("ID слова є обов'язковим для видалення");

    const word = await this.findOne(id, options);
    if (!word) {
      throw new Error(`Слово з ID ${id} не знайдено`);
    }

    await word.destroy(options);
    return true;
  }
}

module.exports = new WordRepository();
