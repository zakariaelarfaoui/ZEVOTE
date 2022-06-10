import mongoose from "mongoose";
import newError from "../helpers/customError.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import Election from "../models/Election.js";

const addVote = asyncWrapper(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.user._id);
  const electionId = mongoose.Types.ObjectId(req.params.electionId);
  const candidateId = mongoose.Types.ObjectId(req.body.candidateId);

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(electionId) ||
    !mongoose.Types.ObjectId.isValid(candidateId)
  )
    return next(newError("Invalid data", 422));

  const election = await Election.findOne(electionId);

  if (!election) {
    return res.status(404).json({
      message: "Election not found",
    });
  }

  if (election.status !== "ongoing") {
    return res.status(400).json({
      message: "Election is not started or has ended",
    });
  }

  const voter = election.voters.find(
    (voter) => voter._id.toString() === id.toString()
  );
  if (!voter) {
    return res.status(400).json({
      message: "You are not allowed to vote",
    });
  }
  if (voter.isVoted) {
    return res.status(400).json({
      message: "You have already voted",
    });
  }

  const candidate = election.candidates.find(
    (candidate) => candidate._id.toString() === candidateId.toString()
  );
  if (!candidate) {
    return res.status(404).json({
      message: "Candidate not found",
    });
  }
  candidate.votes += 1;
  voter.isVoted = true;
  await election.save();

  return res.status(200).json({
    message: "Vote casted successfully",
  });
});

export { addVote };
