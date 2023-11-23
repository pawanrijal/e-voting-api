const { role } = require("../lib/database.connection");

const adminMiddleware = async (req, res, next) => {
  try {
    const userRole = await role.findByPk(req.user.roleId);

    if (userRole.name !== "Admin") {
      throw new Error("Unauthorized");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = adminMiddleware;
