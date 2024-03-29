require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const { logger, logEvent } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { connectDB } = require("./config/dbConn");
const mongoose = require("mongoose");

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());


app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.use("/user", require("./routes/userRoutes"));

app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      message: "404",
    });
  } else {
    res.type("text").send("404");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connect MD !");
  app.listen(port, () => {
    console.log("Server Started !");
  });
});

mongoose.connection.on("error", (err) => {
  logEvent(
    `${err.no}: ${err.name}\t${err.syscall}\t${err.hostname}`,
    "mongoError.log"
  );
  console.log(err);
});
