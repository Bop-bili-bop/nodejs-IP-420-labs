const languageRepository = require("../repositories/languageRepository");
const { sequelize } = require("../models");

class LanguageService {
  async findAll() {
    return await languageRepository.findAll();
  }

  async findOne(id) {
    return await languageRepository.findOne(id);
  }

  async create(data) {
    return await sequelize.transaction(async (t) => {
      return await languageRepository.create(data, { transaction: t });
    });
  }

  async update(id, data) {
    return await sequelize.transaction(async (t) => {
      return await languageRepository.update(id, data, { transaction: t });
    });
  }

  async delete(id) {
    return await sequelize.transaction(async (t) => {
      return await languageRepository.delete(id, { transaction: t });
    });
  }
}

module.exports = new LanguageService();
