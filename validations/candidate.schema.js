const Joi = require("joi");
const candidateRequestSchema = Joi.object({
  positionId: Joi.number().required(),
  manifesto: Joi.string().required().min(50),
});

module.exports = { candidateRequestSchema };
