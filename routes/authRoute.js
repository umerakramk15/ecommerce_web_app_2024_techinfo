import express from "express";
import {
  resgisterController,
  loginController,
} from "../controller/authController.js";
import { requiresSignIn } from "../middleware/authMiddleware.js";

// router Object

const router = express.Router();

// routing
// REGISTER || METHOD POST

router.post("/register", resgisterController);
// LOGIN || METHOD POST

router.post("/login", loginController);

// protected Route

router.get("/user-auth", requiresSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
