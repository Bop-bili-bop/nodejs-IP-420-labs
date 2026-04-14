-- Run this file against the lab4_db database to initialize tables and seed data.
-- Usage: psql -U postgres -d lab4_db -f schema.sql

CREATE TABLE IF NOT EXISTS languages (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS words (
    id          SERIAL PRIMARY KEY,
    text        VARCHAR(255) NOT NULL,
    lang_id     INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    description TEXT DEFAULT '',
    UNIQUE (text, lang_id)
);

CREATE TABLE IF NOT EXISTS dictionaries (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    source_lang_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    target_lang_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    UNIQUE (source_lang_id, target_lang_id)
);

CREATE TABLE IF NOT EXISTS translations (
    id             SERIAL PRIMARY KEY,
    dictionary_id  INTEGER NOT NULL REFERENCES dictionaries(id) ON DELETE CASCADE,
    source_word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    target_word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    UNIQUE (dictionary_id, source_word_id, target_word_id)
);

CREATE INDEX IF NOT EXISTS idx_words_lang_id ON words(lang_id);
CREATE INDEX IF NOT EXISTS idx_words_text ON words(text);
CREATE INDEX IF NOT EXISTS idx_dictionaries_source_lang ON dictionaries(source_lang_id);
CREATE INDEX IF NOT EXISTS idx_dictionaries_target_lang ON dictionaries(target_lang_id);
CREATE INDEX IF NOT EXISTS idx_translations_dictionary_id ON translations(dictionary_id);
CREATE INDEX IF NOT EXISTS idx_translations_source_word_id ON translations(source_word_id);
CREATE INDEX IF NOT EXISTS idx_translations_target_word_id ON translations(target_word_id);
