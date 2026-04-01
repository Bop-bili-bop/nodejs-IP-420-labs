const express = require('express');
const router = express.Router();
const { teamMembers } = require('../utils/data');

router.get("/", (req, res) => {
    res.render('index', { teamMembers });
});

module.exports = router;