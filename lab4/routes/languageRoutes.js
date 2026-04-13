const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

router.get('/languages', languageController.getLanguages.bind(languageController));
router.get('/languages/:id', languageController.getLanguageById.bind(languageController));
router.post('/languages', languageController.createLanguage.bind(languageController));
router.put('/languages/:id', languageController.updateLanguage.bind(languageController));
router.delete('/languages/:id', languageController.deleteLanguage.bind(languageController));

module.exports = router;

