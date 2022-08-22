import Joi from "Joi";

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};


export {registerValidation, loginValidation};