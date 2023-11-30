const CandidateController = require("../controllers/candidate.controller");
const authenticator = require("../middleware/authentication.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const userMiddleware = require("../middleware/user.middleware");
const { candidateRequestSchema } = require("../validations/candidate.schema");
const validator = require("../middleware/validation.middleware");
module.exports = (app) => {
  app
    .route("/api/candidate")
    .post(
      authenticator,
      userMiddleware,
      validator(candidateRequestSchema),
      CandidateController.create
    );
  app.route("/api/candidate").get(authenticator, CandidateController.findAll);
  app
    .route("/api/candidate/:id")
    .get(authenticator, CandidateController.findById);
  app
    .route("/api/candidate/:id")
    .post(authenticator, adminMiddleware, CandidateController.decision);
};
