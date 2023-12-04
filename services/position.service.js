const {
  position,
  election,
  candidate,
  user,
} = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const electionService = require("./election.service");
const { getVoteCount } = require("./candidate.service");
const candidateService = require("./candidate.service");
const { isDateGreaterThanToday } = require("../utils");

class PositionService {
  async create(payload) {
    const electionData = await electionService.findById(payload.electionId);
    if (!electionData) {
      throw new Error("Please Select election");
    }
    let data = await position.create(payload);
    return data;
  }
  async update(payload, id) {
    await this.findById(id);
    await electionService.findById(payload.electionId);

    const returnData = await position.update(payload, {
      where: { id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return returnData;
  }

  async findAll(option) {
    const returnData = await position.findAll({
      ...option,
      include: [election, candidate],
    });

    const total = await position.count();
    return { data: returnData, total };
  }

  async findById(id) {
    const positionData = await position.findOne({
      where: { id },
      include: [election, candidate],
    });
    if (positionData === null || positionData === undefined)
      throw new notFoundException("position");
    return positionData;
  }
  async delete(id) {
    await this.findById(id);
    const returnData = await position.destroy({ where: { id } });
    return returnData;
  }

  async getCandidateVotes(id) {
    const positionData = await this.findById(id);
    const data = [];
    for (let candidate of positionData.candidates) {
      const userData = await user.findByPk(candidate.userId);
      data.push({
        candidateId: candidate.id,
        candidateName: candidate.name,
        voteCount: await getVoteCount(candidate.id),
        email: userData.email ?? "",
        userId: userData.id,
      });
    }
    data.sort((a, b) => b.voteCount - a.voteCount);
    return data;
  }

  async getVoteResult(id, user) {
    const candidateData = await candidateService.findById(id, user);

    const positionData = await this.findById(candidateData.position.id);
    const data = await this.getCandidateVotes(candidateData.position.id);

    const isGreater = isDateGreaterThanToday(positionData.election.endDate);
    if (isGreater) {
      if (data[0]["userId"] === user.id) {
        return "Won";
      }
      return "Lose";
    }
    return "Pending";
  }
}

module.exports = new PositionService();
