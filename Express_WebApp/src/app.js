const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");

// Add Static Path In Webpage
const staticPath = path.join(__dirname, "../public");
// app.use(express.static(staticPath));

// Hbs Path Call In Webpage
app.set("view engine", "hbs");

// Partials Register
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

// Set up Template Path
const template_path = path.join(__dirname, "../templates/views");
app.set("views", template_path);

app.use(express.static(staticPath));

// routing
app.get("", (req, res) => {
  // res.send("Jenil Gohel");

  // hbs render
  res.render("");
});

app.get("/about", (req, res) => {
  // res.send("About Us Page");

  // hbs render
  res.render("about");
});

app.get("/weather", (req, res) => {
  // res.send("weather");

  // hbs render
  res.render("weather");
});

app.get("/*", (req, res) => {
  // res.send("");

  // hbs render
  res.render("404", {
    err: "Page Not Found !",
  });
});

app.listen(port, () => {
  console.log(`${port} port Started`);
});
