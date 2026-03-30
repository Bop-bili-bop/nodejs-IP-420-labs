const express = require('express');
const router = express.Router();

router.get("/:name", (req, res) => {
    const studentName = req.params.name;
    res.render('student', { name: studentName });
});

module.exports = router;