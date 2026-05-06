const { Dictionary } = require("../models");

class DictionaryRepository {
  async findAll(options = {}) {
    return await Dictionary.findAll(options);
  }

  async findOne(id, options = {}) {
    if (!id) throw new Error("ID словника є обов'язковим для пошуку");
    return await Dictionary.findByPk(id, options);
  }

  async create(data, options = {}) {
    return await Dictionary.create(data, options);
  }

  async update(id, data, options = {}) {
    if (!id) throw new Error("ID словника є обов'язковим для оновлення");
    if (!data || Object.keys(data).length === 0)
      throw new Error("Дані для оновлення не надані");

    const dictionary = await this.findOne(id, options);
    if (!dictionary) {
      throw new Error(`Словник з ID ${id} не знайдено`);
    }

    return await dictionary.update(data, options);
  }

  async delete(id, options = {}) {
    if (!id) throw new Error("ID словника є обов'язковим для видалення");

    const dictionary = await this.findOne(id, options);
    if (!dictionary) {
      throw new Error(`Словник з ID ${id} не знайдено`);
    }

    await dictionary.destroy(options);
    return true;
  }
}

module.exports = new DictionaryRepository();
