const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/languages.json');

const getAll = () => {
    const data = fs.readFileSync(filePath, 'utf8'); 
    return JSON.parse(data);
};

module.exports = { getAll };