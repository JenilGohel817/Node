import express from "express";
const app = express();
const PORT = 8080 || process.env.PORT;
import router from "./routes/routes.js";
import dbConnect from "./database/dbConnect.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";

dbConnect.connect(function (error) {
  if (error) throw error;
});

dotenv.config({
  path: "./private/.env",
});
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(helmet());
app.use("/sql", router);
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Sql connected to port ${PORT}`);
});
