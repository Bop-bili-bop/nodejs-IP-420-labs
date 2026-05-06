const express = require("express");
const router = express.Router();
const dictionaryService = require("../../services/dictionaryService");

router.post("/", async (req, res, next) => {
  try {
    const created = await dictionaryService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const items = await dictionaryService.findAll();
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await dictionaryService.findOne(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await dictionaryService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await dictionaryService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
