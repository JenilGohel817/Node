const express = require("express");
const userRouter = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { errorMiddleware } = require("./middlewares/error.js");
const cors = require("cors");
const { models } = require("mongoose");

const app = express();

dotenv.config({ path: "./database/config.env" });

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Using routes
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);

module.exports = { app };
