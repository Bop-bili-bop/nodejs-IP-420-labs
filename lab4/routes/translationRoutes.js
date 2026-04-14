const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

router.get('/translate', translationController.getTranslation.bind(translationController));
router.get('/translations', translationController.getTranslations.bind(translationController));
router.get('/translations/:id', translationController.getTranslationById.bind(translationController));
router.post('/translations', translationController.createTranslation.bind(translationController));
router.put('/translations/:id', translationController.updateTranslation.bind(translationController));
router.delete('/translations/:id', translationController.deleteTranslation.bind(translationController));

module.exports = router;

