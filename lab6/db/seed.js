const path = require('path');
const fs = require('fs');
const { sequelize, Language, Dictionary, Word, Translation } = require('../models');

const loadData = (fileName) => {
  const filePath = path.join(__dirname, '../../lab4/data', fileName);
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
};

async function seedDatabase() {
  try {
    console.log("Починаємо завантаження даних до бази через Sequelize...");
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Схему БД синхронізовано.");

    const languages = loadData("languages.json");
    const words = loadData("words.json");
    const dictionaries = loadData("dictionaries.json");
    const translations = loadData("translations.json");

    await Language.bulkCreate(languages, { ignoreDuplicates: true });
    console.log("Мови завантажено.");

    await Word.bulkCreate(words, { ignoreDuplicates: true });
    console.log("Слова завантажено.");

    await Dictionary.bulkCreate(dictionaries, { ignoreDuplicates: true });
    console.log("Словники завантажено.");

    await Translation.bulkCreate(translations, { ignoreDuplicates: true });
    console.log("Переклади завантажено.");

    await sequelize.query("SELECT setval('languages_id_seq', (SELECT MAX(id) FROM languages))");
    await sequelize.query("SELECT setval('words_id_seq', (SELECT MAX(id) FROM words))");
    await sequelize.query("SELECT setval('dictionaries_id_seq', (SELECT MAX(id) FROM dictionaries))");
    await sequelize.query("SELECT setval('translations_id_seq', (SELECT MAX(id) FROM translations))");
    
    console.log("Послідовності оновлено.");
    console.log("Дані успішно завантажено!");
  } 
  catch (error) {
    console.error("Помилка під час завантаження даних:", error);
  } 
  finally {
    await sequelize.close();
  }
}

seedDatabase();