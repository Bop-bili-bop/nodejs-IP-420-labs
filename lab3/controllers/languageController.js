const languageService = require('../services/languageService');

const getLanguages = (req, res) => {
    const languages = languageService.getAllLanguages();
    res.json(languages); 
};

module.exports = { getLanguages };