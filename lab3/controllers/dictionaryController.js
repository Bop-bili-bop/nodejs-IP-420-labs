const dictionaryService = require("../services/dictionaryService");

class DictionaryController {
  constructor(service = dictionaryService) {
    this.service = service;
  }

  getDictionaries(req, res) {
    this.service.findAll((err, data) => {
      if (err) return res.status(500).render("error", { error: err.message });
      res.render("dictionaries", { dictionaries: data });
    });
  }

  getDictionaryById(req, res) {
    this.service.findOne(req.params.id, (err, data) => {
      if (err) return res.status(500).render("error", { error: err.message });
      if (!data)
        return res
          .status(404)
          .render("error", { error: "Dictionary not found" });
      res.json(data);
    });
  }

  createDictionary(req, res) {
    this.service.create(req.body, (err, data) => {
      if (err) return res.status(400).render("error", { error: err.message });
      res.status(201).json(data);
    });
  }

  updateDictionary(req, res) {
    this.service.update(req.params.id, req.body, (err, data) => {
      if (err) {
        if (err.message === "Dictionary not found") {
          return res.status(404).render("error", { error: err.message });
        }
        return res.status(400).render("error", { error: err.message });
      }
      res.json(data);
    });
  }

  deleteDictionary(req, res) {
    this.service.delete(req.params.id, (err, data) => {
      if (err) {
        if (err.message === "Dictionary not found") {
          return res.status(404).render("error", { error: err.message });
        }
        return res.status(500).render("error", { error: err.message });
      }
      res.json(data);
    });
  }
}

module.exports = new DictionaryController();
