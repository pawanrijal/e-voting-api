const dashboardService = require("../services/dashboard.service");
const successResponse = require("../utils/successResponse");

class DashboardController {
  async admin(req, res, next) {
    try {
      const data = await dashboardService.admin();
      successResponse(res, 200, data, "Data Fetched");
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new DashboardController();
