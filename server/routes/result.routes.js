import express from "express";
import { getElectionResults } from "../controllers/election.controller.js";
const router = express.Router();

router.route("/:id").get(getElectionResults);

export default router;
