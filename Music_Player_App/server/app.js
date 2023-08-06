import morgan from "morgan";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./router/authRouter.js";
import postRouter from "./router/postRouter.js";

import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: "./private/config.env",
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

export { app, PORT };
