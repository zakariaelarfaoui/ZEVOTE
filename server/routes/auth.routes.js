import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller.js";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.route("/refresh-token").get(authController.refreshToken);
export default router;
