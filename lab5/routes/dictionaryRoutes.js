const express = require('express');
const router = express.Router();
const dictionaryController = require('../controllers/dictionaryController');

router.get('/dictionaries', dictionaryController.getDictionaries.bind(dictionaryController));
router.get('/dictionaries/:id', dictionaryController.getDictionaryById.bind(dictionaryController));
router.post('/dictionaries', dictionaryController.createDictionary.bind(dictionaryController));
router.put('/dictionaries/:id', dictionaryController.updateDictionary.bind(dictionaryController));
router.delete('/dictionaries/:id', dictionaryController.deleteDictionary.bind(dictionaryController));

module.exports = router;
