const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');
const dictionaryController = require('../controllers/dictionaryController');
const translationController = require('../controllers/translationController');

router.get('/languages', languageController.getLanguages);
router.get('/dictionaries', dictionaryController.getDictionaries);
router.get('/translate', translationController.getTranslation);

module.exports = router;
