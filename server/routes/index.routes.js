import express from "express";
import authRoutes from "./auth.routes.js";
import electionRoutes from "./election.routes.js";
import userRoutes from "./user.routes.js";
import voteRoutes from "./vote.routes.js";
import resultRoutes from "./result.routes.js";
import { verifyAuth, verifyPermission } from "../middleware/auth.js";

const router = express.Router();

router.use("/", authRoutes);
router.use(verifyAuth) 
router.use("/election", electionRoutes);
router.use("/user", userRoutes);
router.use("/vote", voteRoutes);
router.use("/result", resultRoutes);

export default router;
