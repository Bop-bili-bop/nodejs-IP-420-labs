const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/translations.json');

const getAll = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Помилка завантаження перекладів:", err);
        throw err;
    }
};

module.exports = { getAll };