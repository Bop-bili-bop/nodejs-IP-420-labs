const express = require("express");
const router = express.Router();

const wordsApiRoutes = require("./words");
const languagesApiRoutes = require("./languages");
const dictionariesApiRoutes = require("./dictionaries");
const translationsApiRoutes = require("./translations");

router.use("/words", wordsApiRoutes);
router.use("/languages", languagesApiRoutes);
router.use("/dictionaries", dictionariesApiRoutes);
router.use("/translations", translationsApiRoutes);

module.exports = router;
