import express from "express";
import {
  resgisterController,
  loginController,
} from "../controller/authController.js";

// router Object

const router = express.Router();

// routing
// REGISTER || METHOD POST

router.post("/register", resgisterController);
// LOGIN || METHOD POST

router.post("/login", loginController);

export default router;
