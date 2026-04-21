const DictionaryRepository = require('../repositories/dictionaryRepository');

class DictionaryService {
  constructor() {
    this.repository = new DictionaryRepository();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id) {
    return this.repository.findOne(id);
  }

  async create(data) {
    if (!data.name || !data.sourceLangId || !data.targetLangId) {
      throw new Error("Dictionary name, sourceLangId and targetLangId are required");
    }
    return this.repository.create(data);
  }

  async update(id, data) {
    if (!id) throw new Error("Dictionary ID is required");
    const result = await this.repository.update(id, data);
    if (!result) throw new Error("Dictionary not found");
    return result;
  }

  async delete(id) {
    if (!id) throw new Error("Dictionary ID is required");
    const result = await this.repository.delete(id);
    if (!result) throw new Error("Dictionary not found");
    return result;
  }
}

module.exports = new DictionaryService();
