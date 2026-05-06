const dictionaryService = require('../services/dictionaryService');

class DictionaryController {
  constructor(service = dictionaryService) {
    this.service = service;
  }

  async getDictionaries(req, res) {
    try {
      const data = await this.service.findAll();
      res.render('dictionaries', { dictionaries: data });
    } catch (err) {
      res.status(500).render('error', { error: err.message });
    }
  }

  async getDictionaryById(req, res) {
    try {
      const data = await this.service.findOne(req.params.id);
      if (!data) return res.status(404).render('error', { error: 'Dictionary not found' });
      res.json(data);
    } catch (err) {
      res.status(500).render('error', { error: err.message });
    }
  }

  async createDictionary(req, res) {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).render('error', { error: err.message });
    }
  }

  async updateDictionary(req, res) {
    try {
      const data = await this.service.update(req.params.id, req.body);
      res.json(data);
    } catch (err) {
      if (err.message === 'Dictionary not found') return res.status(404).render('error', { error: err.message });
      res.status(400).render('error', { error: err.message });
    }
  }

  async deleteDictionary(req, res) {
    try {
      const data = await this.service.delete(req.params.id);
      res.json(data);
    } catch (err) {
      if (err.message === 'Dictionary not found') return res.status(404).render('error', { error: err.message });
      res.status(500).render('error', { error: err.message });
    }
  }
}

module.exports = new DictionaryController();
