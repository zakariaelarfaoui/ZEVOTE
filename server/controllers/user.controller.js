import CheckDuplicateField from "../helpers/checkDuplicateField.js";
import newError from "../helpers/customError.js";
import hashField from "../helpers/hashField.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import Election from "../models/Election.js";
import User from "../models/User.js";
import {
  addUserValidation,
  updateUserValidation,
} from "../validation/user.validation.js";

const addUser = asyncWrapper(async (req, res, next) => {
  const { electionId } = req.params;

  const election = await Election.findById(electionId);
  if (!election) return next(newError("Election not exist", 400));

  const result = addUserValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const checkDuplicateEmail = await CheckDuplicateField(
    "email",
    req.body.email,
    User
  );
  if (checkDuplicateEmail)
    return next(newError("Voter with this email already exists", 400));

  result.value.password = await hashField("12345678");
  result.value.role = "voter";

  const voter = new User(result.value);
  await voter.save();

  election.voters.push(voter);
  election.save();

  res.status(201).json({
    message: "Voter added successfully",
  });
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const { role } = req.query;

  const pipeline = [
    {
      $project: {
        name: 1,
        email: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ];

  const match = {};

  role && (match.role = role);
  if (Object.keys(match).length > 0) pipeline.unshift({ $match: match });

  const users = await User.aggregate(pipeline);
  const totalUser = await User.countDocuments();
  const numberOfPages = Math.ceil(totalUser / limit);

  res.status(200).json({
    error: false,
    totalUser: totalUser,
    found: users.length,
    numberOfPages,
    data: users,
  });
});

const getAllCandidates = asyncWrapper(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const pipeline = [
    { $match: { role: "candidate" } },
    {
      $project: {
        name: 1,
        email: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ];

  const candidates = await User.aggregate(pipeline);
  const totalCandidates = await User.countDocuments({ role: "candidate" });
  const numberOfPages = Math.ceil(totalCandidates / limit);

  res.status(200).json({
    error: false,
    totalCandidates,
    found: candidates.length,
    numberOfPages,
    data: candidates,
  });
});

const getAllVoters = asyncWrapper(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const pipeline = [
    { $match: { role: "voter" } },
    {
      $project: {
        name: 1,
        email: 1,
      },
    },
    {
      $skip: page * limit,
    },
    {
      $limit: limit,
    },
  ];

  const voters = await User.aggregate(pipeline);
  console.log(voters.length);
  const totalVoters = await User.countDocuments({ role: "voter" });
  const numberOfPages = Math.ceil(totalVoters / limit);

  res.status(200).json({
    error: false,
    totalVoters,
    found: voters.length,
    numberOfPages,
    data: voters,
  });
});

const getUserById = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id, {
    _id: 0,
    name: 1,
    email: 1,
    role: 1,
  });
  if (!user) return next(newError("User not found", 404));
  res.status(200).json({
    error: false,
    data: user,
  });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const result = updateUserValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const user = await User.findByIdAndUpdate(req.params.id, result.value, {
    new: true,
  });
  if (!user) return next(newError("User not found", 404));
  res.status(200).json({
    error: false,
    message: "User updated successfully",
  });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(newError("User not found", 404));
  res.status(200).json({
    error: false,
    message: "User deleted successfully",
  });
});

export {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllCandidates,
  getAllVoters,
};
