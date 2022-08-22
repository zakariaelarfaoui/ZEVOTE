import mongoose from "mongoose";
import CheckDuplicateField from "../helpers/checkDuplicateField.js";
import newError from "../helpers/customError.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import Election from "../models/Election.js";
import User from "../models/User.js";
import { electionValidation } from "../validation/election.validation.js";

const addElection = asyncWrapper(async (req, res, next) => {
  const id = "629d2301c9e17d0b6e5d7ea1";
  const result = electionValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const checkDuplicateName = await CheckDuplicateField(
    "title",
    req.body.title,
    Election
  );
  if (checkDuplicateName)
    return next(newError("Election with this title already exists", 400));

  result.value.manager_id = id;

  const election = new Election(result.value);
  await election.save();
  res.status(201).json({
    message: "Election added successfully",
  });
});

const getAllElections = asyncWrapper(async (req, res, next) => {
  const id = req.user._id;
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const openElections = await Election.aggregate([
    { $match: { status: "open" } },
    {
      $project: {
        title: 1,
        startDate: {
          $dateToString: { format: "%d-%m-%Y", date: "$startDate" },
        },
        endDate: { $dateToString: { format: "%d-%m-%Y", date: "$endDate" } },
        status: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);
  const closedElections = await Election.aggregate([
    { $match: { status: "closed" } },
    {
      $project: {
        title: 1,
        startDate: {
          $dateToString: { format: "%d-%m-%Y", date: "$startDate" },
        },
        endDate: { $dateToString: { format: "%d-%m-%Y", date: "$endDate" } },
        status: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);
  const pendingElections = await Election.aggregate([
    { $match: { status: "pending" } },
    {
      $project: {
        title: 1,
        startDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$startDate" },
        },
        endDate: { $dateToString: { format: "%Y-%m-%d", date: "$endDate" } },
        status: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);

  res.status(200).json({
    error: false,
    data: { openElections, closedElections, pendingElections },
  });
});

const getElectionById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const pipeline = [
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "voters._id",
        foreignField: "_id",
        as: "voters",
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        startDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$startDate",
          },
        },
        endDate: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$endDate",
          },
        },
        status: 1,
        candidates: 1,
        voters: {
          _id: 1,
          name: 1,
          email: 1,
        },
      },
    },
  ];

  const election = await Election.aggregate(pipeline);
  if (!election) return next(newError("Election not found", 404));
  res.status(200).json({
    error: false,
    data: election[0],
  });
});

const updateElection = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const result = electionValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const election = await Election.findByIdAndUpdate(id, result.value, {
    new: true,
  });
  if (!election) return next(newError("Election not found", 404));
  res.status(200).json({
    error: false,
    message: "Election updated successfully",
  });
});

const deleteElection = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const election = await Election.findByIdAndDelete(id);
  if (!election) return next(newError("Election not found", 404));
  res.status(200).json({
    error: false,
    message: "Election deleted successfully",
  });
});

const addCandidateToElection = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid election id", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const candidate = req.body;
  candidate.image = req.file.filename;

  election.candidates.push(candidate);
  await election.save();
  res.status(200).json({
    error: false,
    message: "User added successfully",
  });
});

const addVoterToElection = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { voterId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(voterId)
  )
    return next(newError("Invalid data", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const voter = await User.findById(voterId);
  if (!voter) return next(newError("User not found", 404));

  election.voters.push(voter);
  await election.save();

  res.status(200).json({
    error: false,
    message: "Voter added successfully",
  });
});

const removeCandidateFromElection = asyncWrapper(async (req, res, next) => {
  const { id, candidateId } = req.params;
  // const { candidateId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(candidateId)
  )
    return next(newError("Invalid data", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const candidate = election?.candidates.find(
    (candidate) => candidate?._id.toString() === candidateId.toString()
  );
  console.log(candidate);

  election.candidates.pull(candidate);
  await election.save();
  res.status(200).json({
    error: false,
    message: "Candidate removed successfully",
  });
});

const removeVoterFromElection = asyncWrapper(async (req, res, next) => {
  const { id, voterId } = req.params;
  console.log(id, voterId);

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const voter = election?.voters.find(
    (voter) => voter?._id.toString() === voterId.toString()
  );

  // console.log(voter);

  election.voters.pull(voter);
  await election.save();
  res.status(200).json({
    error: false,
    message: "Voter removed successfully",
  });
});

const getElectionVoters = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const voters = await User.find(
    { _id: { $in: election.voters } },
    { name: 1 }
  );
  if (!voters) return next(newError("No voters found", 404));

  res.status(200).json({
    error: false,
    data: voters,
  });
});

const getElectionCandidates = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const candidates = await User.find(
    { _id: { $in: election.candidates } },
    { name: 1 }
  );
  if (!candidates) return next(newError("No candida tes found", 404));

  res.status(200).json({
    error: false,
    data: candidates,
  });
});

const getElectionResults = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));

  const candidates = await User.find({ _id: { $in: election.candidates } });
  if (!candidates) return next(newError("Users not found", 404));

  const votes = await Election.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    { $unwind: "$candidates" },
    { $group: { _id: "$candidates", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  if (!votes) return next(newError("Votes not found", 404));

  const results = candidates.map((candidate) => {
    const vote = votes.find(
      (v) => v._id.toString() === candidate._id.toString()
    );
    return {
      ...candidate.toJSON(),
      votes: vote ? vote.count : 0,
    };
  });
  res.status(200).json({
    error: false,
    data: results,
  });
});

const getVoterElection = asyncWrapper(async (req, res, next) => {
  const id = req.user._id;
  const role = req.us;
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const openElections = await Election.aggregate([
    {
      $match: {
        status: "open",
        voters: { $in: [mongoose.Types.ObjectId(id)] },
      },
    },
    {
      $project: {
        title: 1,
        startDate: {
          $dateToString: { format: "%d-%m-%Y", date: "$startDate" },
        },
        endDate: { $dateToString: { format: "%d-%m-%Y", date: "$endDate" } },
        status: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);
  const closedElections = await Election.aggregate([
    {
      $match: {
        status: "closed",
        voters: { $in: [mongoose.Types.ObjectId(id)] },
      },
    },
    {
      $project: {
        title: 1,
        startDate: {
          $dateToString: { format: "%d-%m-%Y", date: "$startDate" },
        },
        endDate: { $dateToString: { format: "%d-%m-%Y", date: "$endDate" } },
        status: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);
  const pendingElections = await Election.aggregate([
    {
      $match: {
        status: "pending",
        voters: { $in: [mongoose.Types.ObjectId(id)] },
      },
    },
    {
      $project: {
        title: 1,
        startDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$startDate" },
        },
        endDate: { $dateToString: { format: "%Y-%m-%d", date: "$endDate" } },
        status: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ]);

  res.status(200).json({
    error: false,
    data: { openElections, closedElections, pendingElections },
  });
});

export {
  addElection,
  getAllElections,
  getElectionById,
  updateElection,
  deleteElection,
  addCandidateToElection,
  addVoterToElection,
  removeCandidateFromElection,
  removeVoterFromElection,
  getElectionVoters,
  getElectionCandidates,
  getElectionResults,
  getVoterElection,
};
