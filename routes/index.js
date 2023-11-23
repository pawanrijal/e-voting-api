const UserRoute = require("./user.route");
const ElectionRoute = require("./election.route");

exports.initRoutes = (app) => {
  UserRoute(app);
  ElectionRoute(app);
};
