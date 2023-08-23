import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dbConnect from "./database/dbConnect.js";
import authRoutes from "./routers/authRoutes.js";
import userRoutes from "./routers/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config({
  path: "./private/.env",
});

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/authApi/v1", authRoutes);
app.use("/userApi/v1", userRoutes);

dbConnect();

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
