const dictionaryRepository = require("../repositories/dictionaryRepository");
const { sequelize } = require("../models");

class DictionaryService {
  async findAll() {
    return await dictionaryRepository.findAll();
  }

  async findOne(id) {
    return await dictionaryRepository.findOne(id);
  }

  async create(data) {
    return await sequelize.transaction(async (t) => {
      return await dictionaryRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    return await sequelize.transaction(async (t) => {
      return await dictionaryRepository.update(id, data, { transaction: t });
    });
  }

  async delete(id) {
    return await sequelize.transaction(async (t) => {
      return await dictionaryRepository.delete(id, { transaction: t });
    });
  }
}

module.exports = new DictionaryService();
