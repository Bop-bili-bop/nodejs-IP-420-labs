const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Word = sequelize.define('Word', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text:        { type: DataTypes.STRING(255), allowNull: false },
  langId:      { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, defaultValue: '' },
}, {
  tableName: 'words',
  indexes: [{ unique: true, fields: ['text', 'lang_id'] }],
});

module.exports = Word;
