const wordRepository = require('../repositories/wordRepository');
const translationRepository = require('../repositories/translationRepository');

const translate = async (wordText, targetLangId) => {
    const words = await wordRepository.getAll();
    const translations = await translationRepository.getAll();

    const sourceWord = words.find(w => w.text.toLowerCase() === wordText.toLowerCase());
    if (!sourceWord) return null;

    const translationEntry = translations.find(t => t.sourceWordId === sourceWord.id);
    if (!translationEntry) return null;

    const targetWord = words.find(w => w.id === translationEntry.targetWordId);

    if (targetLangId && targetWord.langId !== parseInt(targetLangId)) {
        return null;
    }

    return targetWord ? targetWord.text : null;
};

module.exports = { translate };