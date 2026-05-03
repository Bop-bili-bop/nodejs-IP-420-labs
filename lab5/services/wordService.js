const wordRepository = require("../repositories/wordRepository");
const { sequelize } = require("../models");

class WordService {
  async findAll() {
    return await wordRepository.findAll();
  }

  async findOne(id) {
    return await wordRepository.findOne(id);
  }

  async create(data) {
    return await sequelize.transaction(async (t) => {
      return await wordRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    return await sequelize.transaction(async (t) => {
      return await wordRepository.update(id, data, { transaction: t });
    });
  }

  async delete(id) {
    return await sequelize.transaction(async (t) => {
      return await wordRepository.delete(id, { transaction: t });
    });
  }
}

module.exports = new WordService();
