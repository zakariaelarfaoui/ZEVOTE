import express from "express";
import { addVote } from "../controllers/vote.controller.js";
const router = express.Router();

router.route("/:electionId/:candidateId").post(addVote);

export default router;
