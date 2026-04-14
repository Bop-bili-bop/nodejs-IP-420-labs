const translationService = require("../services/translationService");

class TranslationController {
  constructor(service = translationService) {
    this.service = service;
  }

  async getTranslations(req, res) {
    try {
      const translations = await this.service.findAll();
      res.render("translate", { translations });
    } catch (error) {
      res.status(500).render("error", { error: error.message });
    }
  }

  async getTranslationById(req, res) {
    try {
      const translation = await this.service.findOne(req.params.id);
      if (!translation) {
        return res
          .status(404)
          .render("error", { error: "Translation not found" });
      }
      res.json(translation);
    } catch (error) {
      res.status(500).render("error", { error: error.message });
    }
  }

  async createTranslation(req, res) {
    try {
      const translation = await this.service.create(req.body);
      res.status(201).json(translation);
    } catch (error) {
      res.status(400).render("error", { error: error.message });
    }
  }

  async updateTranslation(req, res) {
    try {
      const translation = await this.service.update(req.params.id, req.body);
      res.json(translation);
    } catch (error) {
      if (error.message === "Translation not found") {
        return res.status(404).render("error", { error: error.message });
      }
      res.status(400).render("error", { error: error.message });
    }
  }

  async deleteTranslation(req, res) {
    try {
      const translation = await this.service.delete(req.params.id);
      res.json(translation);
    } catch (error) {
      if (error.message === "Translation not found") {
        return res.status(404).render("error", { error: error.message });
      }
      res.status(500).render("error", { error: error.message });
    }
  }

  async getTranslation(req, res) {
    try {
      const { word, lang } = req.query;

      if (!word) {
        return res
          .status(400)
          .render("error", { error: "Параметр 'word' обов'язковий" });
      }

      const result = await this.service.translate(word, lang);

      if (result) {
        res.render("translate", { original: word, translation: result });
      } else {
        res.status(404).render("error", { error: "Переклад не знайдено" });
      }
    } catch (error) {
      res.status(500).render("error", { error: "Помилка сервера" });
    }
  }
}

module.exports = new TranslationController();
