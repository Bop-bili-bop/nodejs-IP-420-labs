const translationService = require('../services/translationService');

const getTranslation = async (req, res) => {
    try {
        const { word, lang } = req.query;

        if (!word) {
            return res.status(400).json({ error: "Параметр 'word' обов'язковий" });
        }

        const result = await translationService.translate(word, lang);

        if (result) {
            res.json({ original: word, translation: result });
        } else {
            res.status(404).json({ error: "Переклад не знайдено" });
        }
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера" });
    }
};

module.exports = { getTranslation };