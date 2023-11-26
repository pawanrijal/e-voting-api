const CandidateController = require("../controllers/candidate.controller");
// const { positionSchema } = require("../validations/position.schema");
const authenticator = require("../middleware/authentication.middleware");
// const validator = require("../middleware/validation.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
module.exports = (app) => {
  //   app
  //     .route("/api/position")
  //     .post(
  //       authenticator,
  //       adminMiddleware,
  //       validator(positionSchema),
  //       PositionController.create
  //     );
  app
    .route("/api/candidate")
    .get(authenticator, adminMiddleware, CandidateController.findAll);
  app
    .route("/api/candidate/:id")
    .get(authenticator, adminMiddleware, CandidateController.findById);
  app
    .route("/api/candidate/:id")
    .post(authenticator, adminMiddleware, CandidateController.decision);
};
