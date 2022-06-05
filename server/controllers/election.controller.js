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

export { addElection };
