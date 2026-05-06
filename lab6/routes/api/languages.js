const express = require("express");
const router = express.Router();
const languageService = require("../../services/languageService");

router.post("/", async (req, res, next) => {
  try {
    const created = await languageService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const items = await languageService.findAll();
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await languageService.findOne(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await languageService.update(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await languageService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
