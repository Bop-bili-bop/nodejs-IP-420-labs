const languageService = require('../services/languageService');

class LanguageController {
  constructor(service = languageService) {
    this.service = service;
  }

  async getLanguages(req, res) {
    try {
      const languages = await this.service.findAll();
      res.render('languages', { languages });
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }

  async getLanguageById(req, res) {
    try {
      const language = await this.service.findOne(req.params.id);
      if (!language) return res.status(404).render('error', { error: 'Language not found' });
      res.json(language);
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }

  async createLanguage(req, res) {
    try {
      const language = await this.service.create(req.body);
      res.status(201).json(language);
    } catch (error) {
      res.status(400).render('error', { error: error.message });
    }
  }

  async updateLanguage(req, res) {
    try {
      const language = await this.service.update(req.params.id, req.body);
      res.json(language);
    } catch (error) {
      if (error.message === 'Language not found') return res.status(404).render('error', { error: error.message });
      res.status(400).render('error', { error: error.message });
    }
  }

  async deleteLanguage(req, res) {
    try {
      const language = await this.service.delete(req.params.id);
      res.json(language);
    } catch (error) {
      if (error.message === 'Language not found') return res.status(404).render('error', { error: error.message });
      res.status(500).render('error', { error: error.message });
    }
  }
}

module.exports = new LanguageController();
