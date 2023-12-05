const {
  user,
  candidate,
  election,
  position,
} = require("../lib/database.connection");

class DashboardService {
  async admin() {
    try {
      const data = {
        voters: 0,
        candidates: 0,
        elections: 0,
        positions: 0,
      };
      data.voters = await user.count({ where: { roleId: 2 } });
      data.candidates = await candidate.count({ where: { status: 1 } });
      data.elections = await election.count();
      data.positions = await position.count();
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new DashboardService();
