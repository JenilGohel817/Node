const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
require("./db/db_connection");
const port = process.env.PORT || 3000;

const Register = require("./models/register");
const { json } = require("express");
const { request } = require("http");

// Path For Files Connections
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// User Json Data Best Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

  // 2. Connect With H bs Template Engine File
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Create new user in database
app.post("/register", async (req, res) => {
  try {
    let uname = req.body.name;
    let uemail = req.body.email;
    let orgpassword = req.body.password;
    let cPassword = req.body.confirmpassword;

    if (orgpassword === cPassword) {
      const registerEmp = new Register({
        name: uname,
        email: uemail,
        password: orgpassword,
        confirmpassword: cPassword,
      });

      const registerd = await registerEmp.save((err) => {
        if (err) {
          res.json({ message: err.message, type: "danger" });
        } else {
          req.session.message = {
            type: "success",
            message: "User Added !",
          };
          res.render("index");
        }
      });
      console.log("-----------------------------", registerd);
      res.send(201).render("index");
    } else {
      res.send("Password Is Not Matching");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => {
  console.log("Connected !");
});
