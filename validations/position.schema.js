const Joi = require("joi");
const positionSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name should be string",
  }),
  description: Joi.string(),
  electionId: Joi.number(),
});

module.exports = { positionSchema };
