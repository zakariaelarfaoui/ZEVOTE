import Joi from "joi";

const electionValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6),
    description: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref("startDate")).message({
      "date.greater": "End date  must be greater than start date",
    }),
    status: Joi.string().valid("started", "finished", "pending"),
    candidates: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};

export { electionValidation };
