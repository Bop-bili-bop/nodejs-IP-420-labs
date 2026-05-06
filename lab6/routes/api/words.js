const express = require('express');
const router = express.Router();
const wordService = require('../../services/wordService');

// GET /api/v1/words/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await wordService.findOne(req.params.id);
    if (!data) {
      const err = new Error('Слово не знайдено');
      err.statusCode = 404;
      return next(err);
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// PUT /api/v1/words/:id
router.put('/:id', async (req, res, next) => {
  try {
    await wordService.update(req.params.id, req.body);
    res.json({ message: 'Слово успішно оновлено' });
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
});

// DELETE /api/v1/words/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await wordService.delete(req.params.id);
    res.json({ message: 'Слово успішно видалено' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;