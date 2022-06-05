import mongoose from "mongoose";
import CheckDuplicateField from "../helpers/checkDuplicateField.js";
import newError from "../helpers/customError.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import Election from "../models/Election.js";
import { electionValidation } from "../validation/election.validation.js";

const addElection = asyncWrapper(async (req, res, next) => {
  const result = electionValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const checkDuplicateName = await CheckDuplicateField(
    "title",
    req.body.title,
    Election
  );
  if (checkDuplicateName)
    return next(newError("Election with this title already exists", 400));

  const election = new Election(result.value);
  await election.save();
  res.status(201).json({
    message: "Election added successfully",
  });
});

const getAllElections = asyncWrapper(async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const { status } = req.query;

  const pipeline = [
    {
      $project: {
        title: 1,
        startDate: 1,
        endDate: 1,
        status: 1,
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

  status && (match.status = status);
  if (Object.keys(match).length > 0) pipeline.unshift({ $match: match });

  const elections = await Election.aggregate(pipeline);
  const totalElection = await Election.countDocuments();
  const numberOfPages = Math.ceil(totalElection / limit);

  res.status(200).json({
    error: false,
    totalElection: totalElection,
    found: elections.length,
    numberOfPages,
    data: elections,
  });
});

const getElectionById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const election = await Election.findById(id);
  if (!election) return next(newError("Election not found", 404));
  res.status(200).json({
    error: false,
    data: election,
  });
});

const updateElection = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(newError("Invalid data", 422));

  const result = electionValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const checkDuplicateName = await CheckDuplicateField(
    "title",
    req.body.title,
    Election,
  );
  if (checkDuplicateName)
    return next(newError("Election with this title already exists", 400));

  const election = await Election.findByIdAndUpdate(id, result.value, {
    new: true,
  });
  if (!election) return next(newError("Election not found", 404));
  res.status(200).json({
    error: false,
    data: election,
  });
});

export { addElection, getAllElections, getElectionById, updateElection };
