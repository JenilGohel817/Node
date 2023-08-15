dotenv.config();
import cors from "cors";
import colors from "colors";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { dbConnect } from "./database/dbConnect.js";
import userRouter from "./router/userRouter.js";
import postRouter from "./router/postRouter.js";
import likeRouter from "./router/likeRouter.js";
import commentRouter from "./router/commentRouter.js";
import fileUpload from "express-fileupload";
const app = express();
const PORT = 8080 || process.env.PORT;

dbConnect();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("upload"));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/comment", commentRouter);

app.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV} server started ! and port ${PORT}`.bgGreen.black
  );
});
