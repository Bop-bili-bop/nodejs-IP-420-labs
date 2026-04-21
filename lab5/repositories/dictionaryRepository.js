const { Dictionary } = require('../models');

class DictionaryRepository {
  constructor(transaction = null) {
    this.transaction = transaction;
  }

  async findAll() {
    return Dictionary.findAll({ transaction: this.transaction });
  }

  async findOne(id) {
    return Dictionary.findByPk(id, { transaction: this.transaction });
  }

  async create(data) {
    return Dictionary.create(data, { transaction: this.transaction });
  }

  async update(id, data) {
    const instance = await Dictionary.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    return instance.update(data, { transaction: this.transaction });
  }

  async delete(id) {
    const instance = await Dictionary.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    await instance.destroy({ transaction: this.transaction });
    return instance;
  }
}

module.exports = DictionaryRepository;
