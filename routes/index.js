const UserRoute = require("./user.route");
const ElectionRoute = require("./election.route");
const PositionRoute = require("./position.route");
const CandidateRoute = require("./candidate.route");

exports.initRoutes = (app) => {
  UserRoute(app);
  ElectionRoute(app);
  PositionRoute(app);
  CandidateRoute(app);
};
