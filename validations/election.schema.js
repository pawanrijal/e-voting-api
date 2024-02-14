const Joi = require("joi");
const electionSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name should be string",
  }),
  description: Joi.string(),
  time:Joi.number().required()
  // startDate: Joi.string().required(),
  // endDate: Joi.string().required(),
});

module.exports = { electionSchema };
