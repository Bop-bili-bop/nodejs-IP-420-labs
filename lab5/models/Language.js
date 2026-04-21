const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Language = sequelize.define('Language', {
  id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
}, {
  tableName: 'languages',
});

module.exports = Language;
