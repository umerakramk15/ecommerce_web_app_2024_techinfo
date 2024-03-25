import express from "express";
import {
  resgisterController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  setStatusOrdersController,
} from "../controller/authController.js";
import { isAdmin, requiresSignIn } from "../middleware/authMiddleware.js";

// router Object

const router = express.Router();

// routing
// REGISTER || METHOD POST

router.post("/register", resgisterController);
// LOGIN || METHOD POST

router.post("/login", loginController);

//forgot password || POST

router.post("/forgot-password", forgotPasswordController, (req, res) => {});

// protected Route fro User

router.get("/user-auth", requiresSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Route for admin
router.get("/admin-auth", requiresSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile

router.put("/profile", requiresSignIn, updateProfileController);

//orders
router.get("/orders", requiresSignIn, getOrdersController);

//All orders
router.get("/all-orders", requiresSignIn, isAdmin, getAllOrdersController);
//status update orders
router.put("/all-status/:orderId", requiresSignIn, isAdmin, setStatusOrdersController);

export default router;
