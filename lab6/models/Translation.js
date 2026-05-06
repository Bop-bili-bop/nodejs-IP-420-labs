const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Translation = sequelize.define('Translation', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dictionaryId: { type: DataTypes.INTEGER, allowNull: false },
  sourceWordId: { type: DataTypes.INTEGER, allowNull: false },
  targetWordId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'translations',
  indexes: [{ unique: true, fields: ['dictionary_id', 'source_word_id', 'target_word_id'] }],
});

module.exports = Translation;
