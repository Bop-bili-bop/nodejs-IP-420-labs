const wordService = require('../services/wordService');

class WordController {
    constructor(service = wordService) {
        this.service = service;
    }

    getWords(req, res) {
        this.service.findAll()
            .then(data => res.json(data))
            .catch(err => res.status(500).json({ error: err.message }));
    }

    getWordById(req, res) {
        this.service.findOne(req.params.id)
            .then(data => {
                if (!data) return res.status(404).json({ error: 'Word not found' });
                res.json(data);
            })
            .catch(err => res.status(500).json({ error: err.message }));
    }

    createWord(req, res) {
        this.service.create(req.body)
            .then(data => res.status(201).json(data))
            .catch(err => res.status(400).json({ error: err.message }));
    }

    updateWord(req, res) {
        this.service.update(req.params.id, req.body)
            .then(data => res.json(data))
            .catch(err => {
                if (err.message === 'Word not found') {
                    return res.status(404).json({ error: err.message });
                }
                res.status(400).json({ error: err.message });
            });
    }

    deleteWord(req, res) {
        this.service.delete(req.params.id)
            .then(data => res.json(data))
            .catch(err => {
                if (err.message === 'Word not found') {
                    return res.status(404).json({ error: err.message });
                }
                res.status(500).json({ error: err.message });
            });
    }
}

module.exports = new WordController();