const { Translation } = require('../models');

class TranslationRepository {
  constructor(transaction = null) {
    this.transaction = transaction;
  }

  async findAll() {
    return Translation.findAll({ transaction: this.transaction });
  }

  async findOne(id) {
    return Translation.findByPk(id, { transaction: this.transaction });
  }

  async create(data) {
    return Translation.create(data, { transaction: this.transaction });
  }

  async update(id, data) {
    const instance = await Translation.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    return instance.update(data, { transaction: this.transaction });
  }

  async delete(id) {
    const instance = await Translation.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    await instance.destroy({ transaction: this.transaction });
    return instance;
  }
}

module.exports = TranslationRepository;
