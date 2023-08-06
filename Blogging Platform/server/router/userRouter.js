import express from "express";
import {
  userLogin,
  userRegister,
  userFetch,
  userImage,
  userDelete,
  userUpdate,
} from "../controllers/userController.js";
import upload from "../middleware/fileUpload.js";
import requiredSignIn from "../middleware/jwt.js";
const router = express.Router();

router.post("/register", upload.single("photo"), userRegister);

router.post("/login", userLogin);

router.get("/userFetch", userFetch);

router.get("/userImage/:imageId", userImage);

router.delete("/userDelete/:id", userDelete);

router.put("/userUpdate/:id", upload.single("photo"), userUpdate);

export default router;
