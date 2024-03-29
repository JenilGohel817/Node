import express from "express";
import {
  postUpdate,
  postCreate,
  postFetch,
  postFetchSingle,
  postDelete,
  productPhotoController,
} from "../controllers/postController.js";
const router = express.Router();
import ExpressFormidable from "express-formidable";

router.get("/post-photo/:pid", productPhotoController);

router.post("/postCreate", ExpressFormidable(), postCreate);

router.put("/postFetchSingle/:id", ExpressFormidable(), postUpdate);

router.get("/postFetch", postFetch);

router.get("/postUpdate/:id", postFetchSingle);

router.delete("/postDelete/:id", postDelete);

export default router;
