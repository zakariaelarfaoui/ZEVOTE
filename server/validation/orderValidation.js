import Joi from "joi";

const orderValidation = (data) => {
  const schema = Joi.object({
    meals: Joi.array().required(),
    clientId: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().valid(
      "ready",
      "pending",
      "canceled",
      "delivered",
      "on the way"
    ),
    payment: Joi.object({
      // method: Joi.string().required().valid("on delivering", "on app"),
      type: Joi.string().required().valid("credit card", "cash"),
      isPayed: Joi.boolean(),
    }),
    createdAt: Joi.string(),
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
    }),
  });
  return schema.validate(data);
};

export { orderValidation };
