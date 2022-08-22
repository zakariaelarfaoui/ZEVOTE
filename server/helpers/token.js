import jwt from "jsonwebtoken";

export const generateToken = (payload, secretKey, expiresIn = "5m") => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (token, secretKey) => {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    return false;
  }
};
