const UserRoute = require("./user.route");

exports.initRoutes = (app) => {
  UserRoute(app);
};
