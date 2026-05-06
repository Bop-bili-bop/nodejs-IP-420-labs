const express = require("express");
const router = express.Router();
const translationService = require("../../services/translationService");
const { createHttpError } = require("../../utils/errors");

router.get("/lookup", async (req, res, next) => {
  try {
    const { word, lang } = req.query;
    if (!word || String(word).trim() === "") {
      throw createHttpError("query param 'word' is required", 400);
    }

    const translated = await translationService.translate(word, lang);
    if (!translated) {
      throw createHttpError("Translation not found", 404);
    }

    res.status(200).json({ word, lang: lang || null, translation: translated });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const created = await translationService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const items = await translationService.findAll();
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await translationService.findOne(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await translationService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await translationService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
