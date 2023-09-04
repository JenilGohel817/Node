import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = process.env.PORT || 8080;

dotenv.config({
  path: "./private/.env",
});

app.use(morgan("dev"));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use("/spinApi/v1", userRoutes);

dbConnect();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
