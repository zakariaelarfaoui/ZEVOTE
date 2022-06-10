import jwt from "jsonwebtoken";

export const generateToken = (payload, secretKey, expiresIn = "5m") => {
  const token = jwt.sign({ payload }, secretKey, {
    expiresIn: expiresIn,
  });
  return token;
};
