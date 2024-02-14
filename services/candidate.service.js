const { candidate, position, vote } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const userService = require("./user.service");
const positionService = require("../services/position.service");
const voteService = require("./vote.service");

class CandidateService {
  async create(payload, user) {
    // await positionService.findById(payload.positionId);
    const candidateData = await candidate.findOne({
      where: { userId: user.id, positionId: payload.positionId },
    });
    if (candidateData) {
      throw new Error("Request Already Submitted");
    }
    payload.name = user.fullName;
    payload.userId = user.id;
    payload.status = 0; //default
    let data = await candidate.create(payload);
    return data;
  }

  async findAll(user, option) {
    const roleData = await userService.getRoleOfUser(user.id);
    if (roleData.name === "Admin") {
      const returnData = await candidate.findAll({
        ...option,
        include: [position],
      });

      const total = await candidate.count();
      return { data: returnData, total };
    }
    if (roleData.name === "User") {
      const returnData = await candidate.findAll({
        where: {
          userId: user.id,
        },
        include: [position],
      });
      return { data: returnData };
    }
  }

  async findById(id, user) {
    const roleData = await userService.getRoleOfUser(user.id);
    if (roleData.name === "User") {
      const candidateData = await candidate.findOne({
        where: { id, userId: user.id },
        include: [position],
      });
      if (candidateData === null || candidateData === undefined)
        throw new notFoundException("candidate");
      candidateData.dataValues.voteCount = await this.getVoteCount(id);
      return candidateData;
    } else {
      const candidateData = await candidate.findOne({
        where: { id },
        include: [position],
      });
      if (candidateData === null || candidateData === undefined)
        throw new notFoundException("candidate");

      candidateData.dataValues.voteCount = await this.getVoteCount(id);
      return candidateData;
    }
  }
  async delete(id) {
    await this.findById(id);
    const returnData = await candidate.destroy({ where: { id } });
    return returnData;
  }

  // decision as approve/reject
  async decision(payload, id, user) {
    try {
      const candidateData = await this.findById(id, user);
      candidateData.status = payload.status;
      const returnData = await candidateData.save();
      return returnData;
    } catch (err) {
      throw err;
    }
  }

  async getVoteCount(candidateId) {
    const total = await vote.count({ where: { candidateId } });
    return total;
  }
}

module.exports = new CandidateService();
