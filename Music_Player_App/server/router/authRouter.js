import express from "express";
import multer from "multer";
import { authRegister } from "../controllers/authController.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage });

router.post("/register", uploadFile.single("picture"), authRegister);

export default router;
