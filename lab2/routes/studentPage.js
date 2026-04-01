const express = require('express');
const router = express.Router();
const { teamMembers } = require('./data');

router.get("/:name", (req, res) => {
    const studentName = req.params.name;
    const member = teamMembers.find(m => m.name === studentName);
    if (member) {
        res.render('student', { member });
    } else {
        res.status(404).send('Student not found');
    }
});

module.exports = router;