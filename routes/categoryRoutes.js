import express from "express";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

// routes

// createCategory
router.post(
  "/create-category",
  requiresSignIn,
  isAdmin,
  createCategoryController
);

// updateCategory
router.put(
  "/update-category/:id",
  requiresSignIn,
  isAdmin,
  updateCategoryController
);

// getAll Category
router.get("/get-category", categoryController);

//get Single Category

router.get("/single-category/:slug", singleCategoryController);

//delete Category

router.delete(
  "/delete-category/:id",
  requiresSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
