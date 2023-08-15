import express from "express";
import multer from "multer";
import {
  reduxCreate,
  reduxDelete,
  reduxFetch,
  reduxUpdate,
  reduxGetSingle,
} from "../controller/reduxController.js";
const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post("/reduxCreate", upload.single("photo"), reduxCreate);

route.get("/reduxFetch", reduxFetch);

route.delete("/reduxDelete/:id", reduxDelete);

route.put("/reduxUpdate/:id", upload.single("photo"), reduxUpdate);

route.get("/reduxUpdate/:id", reduxGetSingle);

export default route;
