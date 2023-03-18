const express = require("express");
const app = express();
let Port = 5000;
const sendMail = require("./Controllers/nodemailer");

app.get("/", (req, res) => {
  res.send("Server");
});

app.get("/Mail", sendMail);

const start = async () => {
  try {
    app.listen(Port, () => {
      console.log(`${Port}`);
    });
  } catch {
    console.log("error");
  }
};

start();
