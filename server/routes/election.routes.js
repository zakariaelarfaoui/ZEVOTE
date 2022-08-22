import express from "express";
import * as electionController from "../controllers/election.controller.js";
import upload from "../helpers/multer.js";
const router = express.Router();

router
  .route("/")
  .post(electionController.addElection)
  .get(electionController.getAllElections);
router
  .route("/:id/voter/:voterId")
  .delete(electionController.removeVoterFromElection);
router
  .route("/:id/candidate/:candidateId")
  .delete(electionController.removeCandidateFromElection);
router
  .route("/:id/candidate")
  .get(electionController.getElectionCandidates)
  .post(upload.single("image"), electionController.addCandidateToElection);
router.route("/voters").get(electionController.getVoterElection);
router
  .route("/:id")
  .get(electionController.getElectionById)
  .put(electionController.updateElection)
  .delete(electionController.deleteElection);

export default router;
