import bcrypt from "bcryptjs";

const hashField = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hashedField = await bcrypt.hash(value, salt);
  return hashedField;
};

export default hashField;
