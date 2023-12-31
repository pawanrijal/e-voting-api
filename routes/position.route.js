const PositionController = require("../controllers/position.controller");
const { positionSchema } = require("../validations/position.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const userMiddleware = require("../middleware/user.middleware");
module.exports = (app) => {
  app
    .route("/api/position")
    .post(
      authenticator,
      adminMiddleware,
      validator(positionSchema),
      PositionController.create
    );
  app
    .route("/api/position/:id")
    .put(authenticator, adminMiddleware, PositionController.update);
  app.route("/api/position").get(authenticator, PositionController.findAll);
  app
    .route("/api/position/:id")
    .get(authenticator, PositionController.findById);
  app
    .route("/api/position/:id")
    .delete(authenticator, adminMiddleware, PositionController.delete);

  app
    .route("/api/position/getCandidateVotes/:id")
    .get(authenticator, adminMiddleware, PositionController.getCandidateVotes);

  app
    .route("/api/position/getVoteResult/:id")
    .get(authenticator, userMiddleware, PositionController.getVoteResult);
};
