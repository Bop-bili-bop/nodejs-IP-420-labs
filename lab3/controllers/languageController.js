const languageService = require("../services/languageService");

class LanguageController {
  constructor(service = languageService) {
    this.service = service;
  }

  getLanguages(req, res) {
    try {
      const languages = this.service.findAll();
      res.render("languages", { languages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getLanguageById(req, res) {
    try {
      const language = this.service.findOne(req.params.id);
      if (!language) {
        return res.status(404).json({ error: "Language not found" });
      }
      res.json(language);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createLanguage(req, res) {
    try {
      const language = this.service.create(req.body);
      res.status(201).json(language);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  updateLanguage(req, res) {
    try {
      const language = this.service.update(req.params.id, req.body);
      res.json(language);
    } catch (error) {
      if (error.message === "Language not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  }

  deleteLanguage(req, res) {
    try {
      const language = this.service.delete(req.params.id);
      res.json(language);
    } catch (error) {
      if (error.message === "Language not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LanguageController();
