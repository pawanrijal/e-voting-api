const ElectionController = require("../controllers/election.controller");
const { electionSchema } = require("../validations/election.schema");
const authenticator = require("../middleware/authentication.middleware");
const validator = require("../middleware/validation.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
module.exports = (app) => {
  app
    .route("/api/election")
    .post(
      authenticator,
      adminMiddleware,
      validator(electionSchema),
      ElectionController.create
    );
  app
    .route("/api/election/:id")
    .put(authenticator, adminMiddleware, ElectionController.update);
  app
    .route("/api/election")
    .get(authenticator, adminMiddleware, ElectionController.findAll);
  app
    .route("/api/election/:id")
    .get(authenticator, adminMiddleware, ElectionController.findById);
  app
    .route("/api/election/:id")
    .delete(authenticator, adminMiddleware, ElectionController.delete);
};
