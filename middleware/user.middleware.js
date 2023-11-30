const { role } = require("../lib/database.connection");

const userMiddleware = async (req, res, next) => {
  try {
    const userRole = await role.findByPk(req.user.roleId);

    if (userRole.name !== "User") {
      throw new Error("Unauthorized");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = userMiddleware;
