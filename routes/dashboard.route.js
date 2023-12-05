const dashboardController = require("../controllers/dashboard.controller");
const adminMiddleware = require("../middleware/admin.middleware");
const authenticator = require("../middleware/authentication.middleware");
module.exports = (app) => {
  app
    .route("/api/admin/dashboard")
    .get(authenticator, adminMiddleware, dashboardController.admin);
};
