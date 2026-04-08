const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const mainPage = require('./routes/mainPage');
const studentPage = require('./routes/studentPage');

app.use('/', mainPage);
app.use('/student', studentPage);


async function initData() {
    const dictionaryRepository = require('./repositories/dictionaryRepository');
    const wordRepository = require('./repositories/wordRepository');
    const translationRepository = require('./repositories/translationRepository');

    await new Promise((resolve, reject) => {
        dictionaryRepository.init((err) => (err ? reject(err) : resolve()));
    });
    console.log('[init] dictionaryRepository loaded via callback');

    await wordRepository.init();
    console.log('[init] wordRepository loaded via Promise');

    await translationRepository.init();
    console.log('[init] translationRepository loaded via async/await');
}

async function start() {
    console.log('[init] languageRepository loaded via readFileSync');

    await initData();

    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
}

start();
