import Joi from "Joi";

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};

export {registerValidation}