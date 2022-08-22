import Joi from "joi";

const electionValidation = (data) => {
  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref("startDate")).message({
      "date.greater": "End date  must be greater than start date",
    }),
    status: Joi.string().valid("open", "closed", "pending"),
    candidates: Joi.array(),
    voters: Joi.array(),
  });
  return schema.validate(data);
};

export { electionValidation };
