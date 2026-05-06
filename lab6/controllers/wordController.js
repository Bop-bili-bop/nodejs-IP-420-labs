const wordService = require('../services/wordService');

class WordController {
  constructor(service = wordService) {
    this.service = service;
  }

  async getWords(req, res) {
    try {
      const data = await this.service.findAll();
      res.render('words', { words: data });
    } catch (err) {
      res.status(500).render('error', { error: err.message });
    }
  }

  async getWordById(req, res) {
    try {
      const data = await this.service.findOne(req.params.id);
      if (!data) return res.status(404).render('error', { error: 'Word not found' });
      res.json(data);
    } catch (err) {
      res.status(500).render('error', { error: err.message });
    }
  }

  async createWord(req, res) {
    try {
      await this.service.create(req.body);
      res.redirect('/words');
    } catch (err) {
      res.status(400).render('error', { error: err.message });
    }
  }

  async getEditPage(req, res) {
    try {
      const word = await this.service.findOne(req.params.id);
      if (!word) return res.status(404).render('error', { error: 'Слово не знайдено' });
      res.render('edit-word', { word });
    } catch (err) {
      res.status(500).render('error', { error: err.message });
    }
  }

  async updateWord(req, res) {
    try {
      await this.service.update(req.params.id, req.body);
      res.redirect('/words');
    } catch (err) {
      res.status(400).render('error', { error: err.message });
    }
  }

  async deleteWord(req, res) {
    try {
      await this.service.delete(req.params.id);
      res.redirect('/words');
    } catch (err) {
      res.status(500).render('error', { error: err.message });
    }
  }
}

module.exports = new WordController();
