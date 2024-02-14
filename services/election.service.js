const { election, candidate, position } = require("../lib/database.connection");
const { Op, literal } = require("sequelize");
const { notFoundException } = require("../exceptions/notFound.exception");
const UserService = require("../services/user.service");
const db = require("../lib/database.connection");

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
      const currentDate = new Date();
    const activeElections = await election.findAll({
      where: {
        start_date: { [Op.lte]: currentDate },
        end_date: { [Op.gte]: currentDate },
      },
    });

      const total = await activeElections.length;
      return { data: activeElections, total };
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
