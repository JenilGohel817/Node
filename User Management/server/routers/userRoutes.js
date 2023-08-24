import express from "express";
import {
  userCreate,
  userDelete,
  userFind,
  userFindOne,
  userSearch,
  userUpdate,
} from "../controllers/userController.js";
const router = express.Router();
import upload from "../middlewares/upload.js";

router.post("/userCreate", upload.single("photo"), userCreate);

router.put("/userUpdate/:id", upload.single("photo"), userUpdate);

router.delete("/userDelete/:id", userDelete);

router.get("/userFind", userFind);

router.get("/userFindOne/:id", userFindOne);

router.get("/userSearch/:keyword", userSearch);

export default router;
