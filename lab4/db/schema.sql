-- Lab4 Database Schema
-- Run this file against the lab4_db database to initialize tables and seed data.
-- Usage: psql -U postgres -d lab4_db -f schema.sql

-- ============================================================
-- Tables
-- ============================================================

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

-- Performance-Optimized Indexes
CREATE INDEX IF NOT EXISTS idx_words_lang_id ON words(lang_id);
CREATE INDEX IF NOT EXISTS idx_words_text ON words(text);
CREATE INDEX IF NOT EXISTS idx_dictionaries_source_lang ON dictionaries(source_lang_id);
CREATE INDEX IF NOT EXISTS idx_dictionaries_target_lang ON dictionaries(target_lang_id);
CREATE INDEX IF NOT EXISTS idx_translations_dictionary_id ON translations(dictionary_id);
CREATE INDEX IF NOT EXISTS idx_translations_source_word_id ON translations(source_word_id);
CREATE INDEX IF NOT EXISTS idx_translations_target_word_id ON translations(target_word_id);

-- ============================================================
-- Seed Data
-- ============================================================

INSERT INTO languages (id, name) VALUES
    (1, 'English'),
    (2, 'Ukrainian'),
    (3, 'Romanian'),
    (4, 'Hindi')
ON CONFLICT (id) DO NOTHING;

INSERT INTO words (id, text, lang_id, description) VALUES
    (1, 'apple',  1, 'A round fruit with red or green skin'),
    (2, 'book',   1, 'A written or printed work consisting of pages'),
    (3, 'яблуко', 2, 'Кругла фрукта з червоною або зеленою шкіркою'),
    (4, 'книга',  2, 'Друкований або рукописний твір із сторінок'),
    (5, 'кабан',  2, 'Дикий свиноподібний ссавець'),
    (6, 'boar',   1, 'A wild pig-like mammal')
ON CONFLICT (id) DO NOTHING;

INSERT INTO dictionaries (id, name, source_lang_id, target_lang_id) VALUES
    (1, 'Англо-український', 1, 2),
    (2, 'Українсько-англійський', 2, 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO translations (id, dictionary_id, source_word_id, target_word_id) VALUES
    (1, 1, 1, 3),
    (2, 1, 2, 4),
    (3, 2, 3, 1),
    (4, 1, 6, 5),
    (5, 2, 5, 6)
ON CONFLICT (id) DO NOTHING;

-- Keep sequences in sync after explicit id inserts
SELECT setval('languages_id_seq',    (SELECT MAX(id) FROM languages));
SELECT setval('words_id_seq',        (SELECT MAX(id) FROM words));
SELECT setval('dictionaries_id_seq', (SELECT MAX(id) FROM dictionaries));
SELECT setval('translations_id_seq', (SELECT MAX(id) FROM translations));
