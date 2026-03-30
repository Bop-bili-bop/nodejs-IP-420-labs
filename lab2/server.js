const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const mainPage = require("./routes/mainPage");
const studentPage = require("./routes/studentPage");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainPage);
app.use("/student", studentPage);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
