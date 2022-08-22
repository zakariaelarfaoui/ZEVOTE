import express from "express";

import upload from "../helpers/multer.js";

import {
  addUser,
  deleteUser,
  getAllCandidates,
  getAllUsers,
  getAllVoters,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/election/:electionId").post(addUser).get(getAllUsers);
router.get("/candidate", getAllCandidates);
router.get("/voter", getAllVoters);
router.route("/:id").put(updateUser).get(getUserById).delete(deleteUser);
// router.delete("/:id", deleteUser);
router.delete("/candidate/:id", deleteUser);

export default router;
