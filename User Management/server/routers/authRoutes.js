import express from "express";
import {
  loginAuth,
  logoutAuth,
  registerAuth,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/login", loginAuth);

router.post("/register", auth, registerAuth);

router.post("/logout/:id", logoutAuth);

export default router;
