import express from "express";
import {
  registerController,
  loginController,
  userprofileUpdate,
  forgetPassword,
  orderController,
} from "../controllers/authController.js";
import {
  testController,
  requireSignIn,
  isAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forget-password", forgetPassword);

router.get("/test", requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/userProfile", requireSignIn, userprofileUpdate);

router.get("/orders", requireSignIn, orderController);

export default router;
