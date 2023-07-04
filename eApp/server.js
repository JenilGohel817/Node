import express from "express";
import color from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
const port = process.env.PORT || 8080;
const app = express();
import authRoute from "./routes/authRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

// Config env
dotenv.config();

connectDB();

const allowedOrigins = {
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // This is important.
  origin: "http://localhost:3000",
};
app.use(cors(allowedOrigins));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", authRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/product", ProductRoute);

app.listen(port, () => {
  console.log(`${process.env.DEV_MODE} Server started ! and port ${port}`);
});
