import express from "express";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  getSingleProductPhotoController,
  deleteSingleProductController,
  updateProductController,
  productFilter,
  productCountController,
  productListController,
  productSearchController,
  relatedproductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentsController,
} from "../controller/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes

// create product
router.post(
  "/create-product",
  requiresSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requiresSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all product
router.get("/get-product", getProductController);

// get single product
router.get("/get-product/:slug", getSingleProductController);

// get single product photo
router.get("/product-photo/:pid", getSingleProductPhotoController);

// get single product photo
router.delete("/delete-product/:pid", deleteSingleProductController);

// filter product
router.post("/product-filters", productFilter);

//  product count
router.get("/product-count", productCountController);

//  product per page
router.get("/product-list/:page", productListController);

//  similar product
router.get("/related-product/:pid/:cid", relatedproductController);

//  search product
router.get("/search/:keyword", productSearchController);

// Categories Wise Product
router.get("/product-category/:slug", productCategoryController);

// payments routes
//token
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requiresSignIn, braintreePaymentsController);

export default router;
