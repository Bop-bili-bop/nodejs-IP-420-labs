const { Translation } = require("../models");

class TranslationRepository {
  async findAll(options = {}) {
    return await Translation.findAll(options);
  }

  async findOne(id, options = {}) {
    if (!id) throw new Error("ID перекладу є обов'язковим для пошуку");
    return await Translation.findByPk(id, options);
  }

  async findByCondition(options = {}) {
    return await Translation.findOne(options);
  }

  async create(data, options = {}) {
    return await Translation.create(data, options);
  }

  async update(id, data, options = {}) {
    if (!id) throw new Error("ID перекладу є обов'язковим для оновлення");
    if (!data || Object.keys(data).length === 0)
      throw new Error("Дані для оновлення не надані");

    const translation = await this.findOne(id, options);
    if (!translation) {
      throw new Error(`Переклад з ID ${id} не знайдено`);
    }

    return await translation.update(data, options);
  }

  async delete(id, options = {}) {
    if (!id) throw new Error("ID перекладу є обов'язковим для видалення");

    const translation = await this.findOne(id, options);
    if (!translation) {
      throw new Error(`Переклад з ID ${id} не знайдено`);
    }

    await translation.destroy(options);
    return true;
  }
}

module.exports = new TranslationRepository();
