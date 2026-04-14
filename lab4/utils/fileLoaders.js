'use strict';

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

/**
 * Normalizes a provided path (relative to this utils file) to absolute path.
 * @param {string} relativePath
 * @returns {string}
 */
function toAbsolutePath(relativePath) {
	return path.isAbsolute(relativePath)
		? relativePath
		: path.join(__dirname, '..', relativePath);
}

/**
 * Synchronous JSON loader (blocking).
 * @param {string} relativePath - path relative to project root (lab3/)
 * @returns {any}
 */
function readJsonSync(relativePath) {
	const filePath = toAbsolutePath(relativePath);
	const raw = fs.readFileSync(filePath, 'utf8');
	return JSON.parse(raw);
}

/**
 * Asynchronous JSON loader via callback.
 * @param {string} relativePath
 * @param {Function} callback - (err, data)
 */
function readJsonCallback(relativePath, callback) {
	const filePath = toAbsolutePath(relativePath);
	fs.readFile(filePath, 'utf8', (err, raw) => {
		if (err) return callback(err, null);
		try {
			callback(null, JSON.parse(raw));
		} catch (parseErr) {
			callback(parseErr, null);
		}
	});
}

/**
 * Asynchronous JSON loader returning a Promise.
 * @param {string} relativePath
 * @returns {Promise<any>}
 */
function readJsonPromise(relativePath) {
	const filePath = toAbsolutePath(relativePath);
	return fsp.readFile(filePath, 'utf8').then(raw => JSON.parse(raw));
}

/**
 * Asynchronous JSON loader using async/await.
 * @param {string} relativePath
 * @returns {Promise<any>}
 */
async function readJsonAsync(relativePath) {
	const filePath = toAbsolutePath(relativePath);
	const raw = await fsp.readFile(filePath, 'utf8');
	return JSON.parse(raw);
}

module.exports = {
	readJsonSync,
	readJsonCallback,
	readJsonPromise,
	readJsonAsync,
};

