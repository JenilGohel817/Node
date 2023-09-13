import express from "express";
import {
  sqlAdd,
  sqlGet,
  sqlFind,
  sqlDelete,
  sqlUpdate,
  sqlSearch,
} from "../controllers/controllers.js";
const router = express.Router();

router.post("/sqlAdd", sqlAdd);

router.get("/sqlGet", sqlGet);

router.get("/sqlFind/:id", sqlFind);

router.delete("/sqlDelete/:id", sqlDelete);

router.put("/sqlUpdate/:id", sqlUpdate);

router.get("/search", sqlSearch);

export default router;
