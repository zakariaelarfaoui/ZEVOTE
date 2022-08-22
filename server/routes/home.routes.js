import express from "express";
const router = express.Router();

import homeController from "../controllers/homeController.js";

router.route("/").get(homeController.analytics);

export default router;
