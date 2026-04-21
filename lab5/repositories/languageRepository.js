const { Language } = require('../models');

class LanguageRepository {
  constructor(transaction = null) {
    this.transaction = transaction;
  }

  async findAll() {
    return Language.findAll({ transaction: this.transaction });
  }

  async findOne(id) {
    return Language.findByPk(id, { transaction: this.transaction });
  }

  async create(data) {
    return Language.create(data, { transaction: this.transaction });
  }

  async update(id, data) {
    const instance = await Language.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    return instance.update(data, { transaction: this.transaction });
  }

  async delete(id) {
    const instance = await Language.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    await instance.destroy({ transaction: this.transaction });
    return instance;
  }
}

module.exports = LanguageRepository;
