const { Language } = require("../models");

class LanguageRepository {
  async findAll(options = {}) {
    return await Language.findAll(options);
  }

  async findOne(id, options = {}) {
    if (!id) throw new Error("ID мови є обов'язковим для пошуку");
    return await Language.findByPk(id, options);
  }

  async create(data, options = {}) {
    return await Language.create(data, options);
  }

  async update(id, data, options = {}) {
    if (!id) throw new Error("ID мови є обов'язковим для оновлення");
    if (!data || Object.keys(data).length === 0)
      throw new Error("Дані для оновлення не надані");

    const language = await this.findOne(id, options);
    if (!language) {
      throw new Error(`Мову з ID ${id} не знайдено`);
    }

    return await language.update(data, options);
  }

  async delete(id, options = {}) {
    if (!id) throw new Error("ID мови є обов'язковим для видалення");

    const language = await this.findOne(id, options);
    if (!language) {
      throw new Error(`Мову з ID ${id} не знайдено`);
    }

    await language.destroy(options);
    return true;
  }
}

module.exports = new LanguageRepository();
