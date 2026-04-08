const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

function loadSync(filename) {
    const raw = fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8');
    return JSON.parse(raw);
}

function loadWithCallback(filename, callback) {
    fs.readFile(path.join(DATA_DIR, filename), 'utf-8', (err, raw) => {
        if (err) return callback(err, null);

        try {
            callback(null, JSON.parse(raw));
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
}

function loadWithPromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(DATA_DIR, filename), 'utf-8', (err, raw) => {
            if (err) return reject(err);

            try {
                resolve(JSON.parse(raw));
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
}

async function loadWithAsync(filename) {
    const raw = await fs.promises.readFile(path.join(DATA_DIR, filename), 'utf-8');
    return JSON.parse(raw);
}

module.exports = { loadSync, loadWithCallback, loadWithPromise, loadWithAsync };
