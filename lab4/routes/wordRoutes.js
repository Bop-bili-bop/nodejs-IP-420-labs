const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/words', wordController.getWords.bind(wordController));
router.get('/words/:id', wordController.getWordById.bind(wordController));
router.post('/words', wordController.createWord.bind(wordController));
router.put('/words/:id', wordController.updateWord.bind(wordController));
router.delete('/words/:id', wordController.deleteWord.bind(wordController));

module.exports = router;

