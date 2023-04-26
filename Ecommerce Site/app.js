const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const dbConnection = require("./config/dataBase");
const routes = require("./routes/routes");
const bodyparser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;

dbConnection();

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use("/api/user", routes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Started !`);
});
