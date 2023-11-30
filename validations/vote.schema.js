const Joi = require("joi");

const voteCandidateSchema = Joi.object({
  candidateId: Joi.number().required(),
});

module.exports = { voteCandidateSchema };
