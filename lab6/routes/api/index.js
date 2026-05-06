const express = require('express');
const router = express.Router();

const wordsApiRoutes = require('./words');

// Усі роути для слів будуть доступні за префіксом /words
router.use('/words', wordsApiRoutes);

module.exports = router;