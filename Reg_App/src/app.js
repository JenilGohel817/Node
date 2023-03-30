const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
require("./db/db_connection");
const port = process.env.PORT || 3000;

// Path For Files Connections
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// 1. Connect with static html page - You Need Create a file in public folder
app.use(express.static(staticPath));

// 2. Connect With Hbs Template Engine Files
app.set("view engine", "hbs");

// 3. Connect Path after Create Partials Files
app.set("views", templatePath);
hbs.registerPartials(partialPath);
app.use(express.static("./"));

app.get("/", (req, res) => {
  // 1. Connect with static html page
  // res.send("Jenil");

  // 2. Connect With Hbs Template Engine File
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log("Connected !");
});
