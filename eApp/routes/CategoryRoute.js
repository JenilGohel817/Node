import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  CreateCategoryController,
  UpdateCategoryController,
  GetAllCategory,
  SingleCategory,
  DeleteCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  UpdateCategoryController
);

router.get("/get-all", GetAllCategory);

router.get("/single-category/:slug", SingleCategory);

router.delete("/delete-category/:id", DeleteCategory);

export default router;
