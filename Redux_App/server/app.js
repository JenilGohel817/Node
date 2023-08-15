import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnect from "./database/dbConnect.js";
import reduxRoute from "./routes/reduxRoute.js";
const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

dbConnect();

app.use("/redux", reduxRoute);

app.listen(PORT, () => {
  console.log(`Server Started ! ${PORT}`);
});
