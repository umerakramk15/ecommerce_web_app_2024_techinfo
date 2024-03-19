import express from "express";
import {authController} from "../controller/authController.js";

// router Object

const router = express.Router();

// routing
router.post("/register", resgisterController);

export default router;
