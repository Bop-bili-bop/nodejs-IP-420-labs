const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Dictionary = sequelize.define('Dictionary', {
  id:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:         { type: DataTypes.STRING(255), allowNull: false },
  sourceLangId: { type: DataTypes.INTEGER, allowNull: false },
  targetLangId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'dictionaries',
  indexes: [{ unique: true, fields: ['source_lang_id', 'target_lang_id'] }],
});

module.exports = Dictionary;
