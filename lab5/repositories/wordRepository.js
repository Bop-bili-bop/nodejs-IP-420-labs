const { Word } = require('../models');

class WordRepository {
  constructor(transaction = null) {
    this.transaction = transaction;
  }

  async findAll() {
    return Word.findAll({ transaction: this.transaction });
  }

  async findOne(id) {
    return Word.findByPk(id, { transaction: this.transaction });
  }

  async create(data) {
    return Word.create(data, { transaction: this.transaction });
  }

  async update(id, data) {
    const instance = await Word.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    return instance.update(data, { transaction: this.transaction });
  }

  async delete(id) {
    const instance = await Word.findByPk(id, { transaction: this.transaction });
    if (!instance) return null;
    await instance.destroy({ transaction: this.transaction });
    return instance;
  }
}

module.exports = WordRepository;
