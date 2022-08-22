import CheckDuplicateField from "../helpers/checkDuplicateField.js";
import newError from "../helpers/customError.js";
import hashField, { compareHash } from "../helpers/hashField.js";
import { generateToken } from "../helpers/token.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import User from "../models/User.js";
import {
  loginValidation,
  registerValidation,
} from "../validation/authValidation.js";
import jwt from "jsonwebtoken";

const register = asyncWrapper(async (req, res, next) => {
  /* Validating the request body. */
  const result = registerValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  /* Checking if the email is already exist in the database. */
  const duplicateEmail = await CheckDuplicateField(
    "email",
    result.value.email,
    User
  );
  if (duplicateEmail) return next(newError("Email is already exist", 400));

  result.value.password = await hashField(result.value.password);

  /* Creating a new user and saving it to the database. */
  const user = new User(result.value);
  await user.save();

  /* Creating a token for the user. */
  const token = generateToken(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    "900s"
  );

  return res.sendStatus(201);
});

const login = asyncWrapper(async (req, res, next) => {
  const result = loginValidation(req.body);
  if (result.error) return next(newError(result.error.message, 400));

  const user = await User.findOne({ email: result.value.email });

  if (!user) return next(newError("Email doesn't exist", 400));

  const validPassword = await compareHash(result.value.password, user.password);

  if (!validPassword) return next(newError("Invalid password", 400));
  const { name, email, role, _id } = user;
  const accessToken = generateToken(
    { name, email, role, _id },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    "5m"
  );
  const refreshToken = generateToken(
    { name, email, role, _id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    "1d"
  );

  user.refreshToken = refreshToken;
  user.save();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    error: false,
    accessToken: accessToken,
  });
});

const refreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);

  const refreshToken = cookie?.jwt;
  const user = await User.count({ refreshToken: refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (error, decoded) => {
      if (error) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          _id: decoded._id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "5m" }
      );
      return res.status(201).json({ error: false, accessToken: accessToken });
    }
  );
};

export default {
  register,
  login,
  refreshToken,
};
