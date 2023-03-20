const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const hbs = require("hbs");

// Path Middleware
const sPath = path.join(__dirname, "../public");
app.use(express.static(sPath));

// Set Views Engine
app.set("view engine", "hbs");

// Chnage name views to template
const tempPath = path.join(__dirname, "../templates/views");
app.set("views", tempPath);

// Partial Demo
const partialPath = path.join("../templates/partials");
app.set("views", partialPath);
hbs.registerPartials(partialPath);

// view engine setup

// Template Render In HBS
app.get("", (req, res) => {
  res.render("index", {
    MenuItem: "Jenil",
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// Redirect Another Page
app.get("/", (req, res) => {
  res.send("Jenil Gohel");
});

app.listen(port, () => {
  console.log(`Server Start port is ${port}`);
});
