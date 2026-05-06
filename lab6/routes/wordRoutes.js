const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

// Маршрути для веб-форм та сторінок (EJS)
router.get('/words', wordController.getWords.bind(wordController));
router.post('/words', wordController.createWord.bind(wordController));

router.get('/words/:id/edit', wordController.getEditPage.bind(wordController));
router.post('/words/:id/update', wordController.updateWord.bind(wordController));
router.post('/words/:id/delete', wordController.deleteWord.bind(wordController));

module.exports = router;