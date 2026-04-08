const dictionaryRepository = require('../repositories/dictionaryRepository');

const getAllDictionaries = (callback) => {
    dictionaryRepository.getAll(callback); 
};

module.exports = { getAllDictionaries };