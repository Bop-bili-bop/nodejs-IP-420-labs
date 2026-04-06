const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/dictionaries.json');

const getAll = (callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err, null);
        callback(null, JSON.parse(data));
    });
};

module.exports = { getAll };