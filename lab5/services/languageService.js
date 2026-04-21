const LanguageRepository = require('../repositories/languageRepository');

class LanguageService {
  constructor() {
    this.repository = new LanguageRepository();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id) {
    return this.repository.findOne(id);
  }

  async create(data) {
    if (!data.name) throw new Error("Language name is required");
    return this.repository.create(data);
  }

  async update(id, data) {
    if (!id) throw new Error("Language ID is required");
    if (!data.name) throw new Error("Language name is required");
    const language = await this.repository.update(id, data);
    if (!language) throw new Error("Language not found");
    return language;
  }

  async delete(id) {
    if (!id) throw new Error("Language ID is required");
    const language = await this.repository.delete(id);
    if (!language) throw new Error("Language not found");
    return language;
  }
}

module.exports = new LanguageService();
