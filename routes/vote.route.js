const VoteController = require("../controllers/vote.controller");
const authenticator = require("../middleware/authentication.middleware");
const userMiddleware = require("../middleware/user.middleware");
const validator = require("../middleware/validation.middleware");
const { voteCandidateSchema } = require("../validations/vote.schema");
module.exports = (app) => {
  app
    .route("/api/vote-candidate")
    .post(
      authenticator,
      userMiddleware,
      validator(voteCandidateSchema),
      VoteController.voteCandidate
    );
  app
    .route("/api/get-voted-candidate/:positionId")
    .get(authenticator, userMiddleware, VoteController.getVotedCandidate);
};
