const dictionaryService = require('../services/dictionaryService');

const getDictionaries = (req, res) => {
    dictionaryService.getAllDictionaries((err, data) => {
        if (err) return res.status(500).send("Помилка сервера");
        res.json(data); 
    });
};

module.exports = { getDictionaries };