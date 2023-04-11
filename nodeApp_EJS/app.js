require("dotenv").config();
require("./db");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json);
app.use(
  session({
    secret: "Jenil Gohel",
    saveUninitialized: true,
    resave: true,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use("", require("./routes/routes"));

// Template Engine
app.set("view engine", "ejs");

// Port
app.listen(PORT, () => {
  console.log("Server Started !", PORT);
});
