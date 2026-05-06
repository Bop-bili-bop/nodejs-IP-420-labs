const express = require('express');
const router = express.Router();
const wordService = require('../../services/wordService');

// POST /api/v1/words
router.post('/', async (req, res, next) => {
  try {
    const createdWord = await wordService.create(req.body);
    res.status(201).json(createdWord);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/words
router.get('/', async (req, res, next) => {
  try {
    const result = await wordService.findAll(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/words/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await wordService.findOne(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

// PUT /api/v1/words/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updatedWord = await wordService.update(req.params.id, req.body);
    res.status(200).json(updatedWord);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/words/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await wordService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;