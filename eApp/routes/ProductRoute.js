import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import ExpressFormidable from "express-formidable";
import {
  CreateProduct,
  UpdateProduct,
  GetAllProduct,
  DeleteProduct,
  GetSingleProduct,
  PhotoController,
  productPhotoController,
  RealtedproductController,
  productFilterController,
  productCountController,
  productCategoryController,
  productListController,
  SearchproductController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/ProductController.js";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  CreateProduct
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  UpdateProduct
);

router.get("/get-product", GetAllProduct);

router.get("/product-photo/:pid", productPhotoController);

router.get("/get-single-product/:slug", GetSingleProduct);

router.get("/get-photo-product/:pid", PhotoController);

router.delete("/delete-product/:pid", DeleteProduct);

// Filter Product
router.post("/product-filters", productFilterController);

router.get("/product-count", productCountController);

router.get("/product-list", productListController);

router.get("/search/:keyword", SearchproductController);

router.get("/realted-product/:pid/:cid", RealtedproductController);

router.get("/product-category/:slug", productCategoryController);

// Gateways Payment
router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
