const languageRepository = require('../repositories/languageRepository');

const getAllLanguages = () => {
    return languageRepository.getAll();
};

module.exports = { getAllLanguages };