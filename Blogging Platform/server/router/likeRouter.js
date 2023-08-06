import express from "express";
import { likeAdd } from "../controllers/likeController.js";
const router = express.Router();

router.post("/likeAdd/:postID", likeAdd);

export default router;
