import express from "express";
import {
  userAdd,
  userUpdate,
  userFind,
  userDelete,
  userSingle,
} from "../controllers/userControllers.js";
const router = express.Router();

router
  .post("/userAdd", userAdd)
  .put("/userUpdate/:id", userUpdate)
  .get("/userFind", userFind)
  .delete("/userDelete/:id", userDelete)
  .get("/userSingle/:id", userSingle);

export default router;
