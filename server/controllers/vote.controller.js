import mongoose from "mongoose";
import newError from "../helpers/customError.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import Election from "../models/Election.js";
import Vote from "../models/Vote.js";

const addVote = asyncWrapper(async (req, res, next) => {
  const id = req.user._id;
  const { electionId, candidateId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(electionId) ||
    !mongoose.Types.ObjectId.isValid(candidateId)
  )
    return next(newError("Invalid data", 422));

  const election = await Election.findById(electionId);

  if (!election) return next(newError("Election not found", 404));

  if (election.status !== "open")
    return next(newError("Election is not started or has ended", 404));

  const voter =
    election?.voters.length > 0
      ? election?.voters.find(
          (voter) => voter?._id.toString() === id.toString()
        )
      : null;
  if (!voter) return next(newError("You are not allowed to vote", 404));

  // if (election.voters.length > 0) {
  //   const voter = election?.voters?.find(
  //     (voter) => voter?._id.toString() === id.toString()
  //   );
  //   if (!voter) return next(newError("You are not allowed to vote", 400));
  // }

  const voterStatus = await Vote.findOne({ voter: id, election: electionId });
  if (voterStatus) return next(newError("You have already voted", 400));
  const candidate =
    election?.candidates.length > 0
      ? election?.candidates.find(
          (candidate) => candidate?._id.toString() === candidateId.toString()
        )
      : null;
  if (!candidate) return next(newError("Candidate not found", 400));

  const vote = new Vote({
    candidate: candidateId,
    election: electionId,
    voter: id,
  });
  await vote.save();

  return res.status(200).json({
    error: false,
    message: "Vote casted successfully",
  });
});

export { addVote };
