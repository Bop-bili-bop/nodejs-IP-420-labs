const WordRepository = require('../repositories/wordRepository');

class WordService {
  constructor() {
    this.repository = new WordRepository();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id) {
    return this.repository.findOne(id);
  }

  async create(data) {
    if (!data.text || !data.langId) throw new Error("Word text and langId are required");
    return this.repository.create(data);
  }

  async update(id, data) {
    if (!id) throw new Error("Word ID is required");
    const result = await this.repository.update(id, data);
    if (!result) throw new Error("Word not found");
    return result;
  }

  async delete(id) {
    if (!id) throw new Error("Word ID is required");
    const result = await this.repository.delete(id);
    if (!result) throw new Error("Word not found");
    return result;
  }
}

module.exports = new WordService();
