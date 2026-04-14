const pool = require("./db");
const { readJsonAsync } = require("../utils/fileLoaders");

async function seedDatabase() {
  try {
    console.log("⏳ Починаємо завантаження даних до бази...");

    const languages = await readJsonAsync("data/languages.json");
    const words = await readJsonAsync("data/words.json");
    const dictionaries = await readJsonAsync("data/dictionaries.json");
    const translations = await readJsonAsync("data/translations.json");

    for (const lang of languages) {
      await pool.query(
        "INSERT INTO languages (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING",
        [lang.id, lang.name],
      );
    }
    console.log("✅ Мови завантажено.");

    for (const word of words) {
      await pool.query(
        "INSERT INTO words (id, text, lang_id, description) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
        [word.id, word.text, word.langId, word.description],
      );
    }
    console.log("✅ Слова завантажено.");

    for (const dict of dictionaries) {
      await pool.query(
        "INSERT INTO dictionaries (id, name, source_lang_id, target_lang_id) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
        [dict.id, dict.name, dict.sourceLangId, dict.targetLangId],
      );
    }
    console.log("✅ Словники завантажено.");

    for (const tr of translations) {
      await pool.query(
        "INSERT INTO translations (id, dictionary_id, source_word_id, target_word_id) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
        [tr.id, tr.dictionaryId, tr.sourceWordId, tr.targetWordId],
      );
    }
    console.log("✅ Переклади завантажено.");
    await pool.query(
      "SELECT setval('languages_id_seq', (SELECT MAX(id) FROM languages))",
    );
    await pool.query(
      "SELECT setval('words_id_seq', (SELECT MAX(id) FROM words))",
    );
    await pool.query(
      "SELECT setval('dictionaries_id_seq', (SELECT MAX(id) FROM dictionaries))",
    );
    await pool.query(
      "SELECT setval('translations_id_seq', (SELECT MAX(id) FROM translations))",
    );
    console.log("✅ Послідовності оновлено.");

    console.log("🎉 Дані успішно завантажено!");
  } catch (error) {
    console.error("❌ Помилка під час завантаження даних:", error);
  } finally {
    await pool.end();
  }
}

seedDatabase();
