const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/words.json');

const getAll = () => {
    return fs.readFile(filePath, 'utf8')
        .then(data => JSON.parse(data))
        .catch(err => { consol.log(err) });
}

module.exports = { getAll };