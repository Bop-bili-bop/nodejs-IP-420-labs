const express = require("express");
const path = require("path");
const languageRoutes = require("./routes/languageRoutes");
const dictionaryRoutes = require("./routes/dictionaryRoutes");
const translationRoutes = require("./routes/translationRoutes");
const wordRoutes = require("./routes/wordRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", languageRoutes);
app.use("/", dictionaryRoutes);
app.use("/", translationRoutes);
app.use("/", wordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
