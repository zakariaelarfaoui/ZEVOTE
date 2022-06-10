import Joi from "joi";

const addUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().required().email(),
    role: Joi.string().required().valid("voter", "candidate", "manager"),
  });
  return schema.validate(data);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    role: Joi.string().valid("voter", "candidate", "manager"),
  });
  return schema.validate(data);
};

export { addUserValidation, updateUserValidation };
