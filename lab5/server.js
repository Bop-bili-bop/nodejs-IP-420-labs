require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const path = require("path");
const { sequelize } = require("./models");
const languageRoutes = require("./routes/languageRoutes");
const wordRoutes = require("./routes/wordRoutes");
const dictionaryRoutes = require("./routes/dictionaryRoutes");
const translationRoutes = require("./routes/translationRoutes");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.render("index"));
app.use("/", languageRoutes);
app.use("/", wordRoutes);
app.use("/", dictionaryRoutes);
app.use("/", translationRoutes);

sequelize
  .authenticate()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    ),
  )
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });

module.exports = app;
