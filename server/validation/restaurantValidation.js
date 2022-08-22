import Joi from "joi";

const restaurantValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    cuisine: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
    }),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
    rating: Joi.number().required(),
    managerId: Joi.string().required(),
  });
  return schema.validate(data);
};

export { restaurantValidation };
