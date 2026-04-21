const sequelize = require('../db/sequelize');
const Language   = require('./Language');
const Word       = require('./Word');
const Dictionary = require('./Dictionary');
const Translation = require('./Translation');

Language.hasMany(Word,          { foreignKey: 'langId',       as: 'words' });
Word.belongsTo(Language,        { foreignKey: 'langId',       as: 'language' });

Language.hasMany(Dictionary,    { foreignKey: 'sourceLangId', as: 'sourceDictionaries' });
Language.hasMany(Dictionary,    { foreignKey: 'targetLangId', as: 'targetDictionaries' });
Dictionary.belongsTo(Language,  { foreignKey: 'sourceLangId', as: 'sourceLanguage' });
Dictionary.belongsTo(Language,  { foreignKey: 'targetLangId', as: 'targetLanguage' });

Dictionary.hasMany(Translation,   { foreignKey: 'dictionaryId', as: 'translations' });
Translation.belongsTo(Dictionary, { foreignKey: 'dictionaryId', as: 'dictionary' });

Word.hasMany(Translation,    { foreignKey: 'sourceWordId', as: 'sourceTranslations' });
Word.hasMany(Translation,    { foreignKey: 'targetWordId', as: 'targetTranslations' });
Translation.belongsTo(Word,  { foreignKey: 'sourceWordId', as: 'sourceWord' });
Translation.belongsTo(Word,  { foreignKey: 'targetWordId', as: 'targetWord' });

module.exports = { sequelize, Language, Word, Dictionary, Translation };
