const { election, candidate, position } = require("../lib/database.connection");
const { Op } = require("sequelize");
const { notFoundException } = require("../exceptions/notFound.exception");
const UserService = require("../services/user.service");

class ElectionService {
  async create(payload, user) {
    payload.createdBy = user.id;
    let data = await election.create(payload);
    return data;
  }
  async update(payload, id) {
    await this.findById(id);
    const returnData = await election.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(user, option) {
    const roleData = await UserService.getRoleOfUser(user.id);
    if (roleData.name === "Admin") {
      const returnData = await election.findAll({
        ...option,
      });
      const total = await election.count();
      return { data: returnData, total };
    }
    if (roleData.name === "User") {
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];
      const returnData = await election.findAll({
        ...option,
        where: {
          [Op.and]: [
            { startDate: { [Op.lte]: formattedToday } }, // startDate <= today
            { endDate: { [Op.gte]: formattedToday } }, // endDate >= today
          ],
        },
        include: [position],
      });
      const total = await returnData.length;
      return { data: returnData, total };
    } else {
      //For candidate
    }
  }

  async findById(id) {
    const electionData = await election.findOne({
      where: { id },
      include: [position],
    });
    if (electionData === null || electionData === undefined)
      throw new notFoundException("Election");
    return electionData;
  }
  async delete(id) {
    await this.findById(id);
    const returnData = await election.destroy({ where: { id } });
    return returnData;
  }
}

module.exports = new ElectionService();
