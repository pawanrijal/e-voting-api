const { vote, position, candidate } = require("../lib/database.connection");
const candidateService = require("./candidate.service");
const positionService = require("./position.service");

class VoteService {
  async voteCandidate(payload) {
    try {
      const candidateData = await candidate.findOne({
        where: { id: payload.candidateId },
        include: [position],
      });
      if (!candidateData) {
        throw new Error("Something Went Wrong");
      }
      const voteData = await vote.findAll({
        where: {
          userId: payload.userId,
          positionId: candidateData.position.id,
        },
      });
      if (voteData.length > 0) {
        throw new Error("Already Voted for this position");
      }
      payload.positionId = candidateData.position.id;
      return await vote.create(payload);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getVotedCandidate(payload) {
    try {
      await positionService.findById(payload.positionId);
      const voteData = await vote.findOne({
        where: {
          positionId: payload.positionId,
          userId: payload.userId,
        },
      });
      if (!voteData) {
        throw Error("Not Voted");
      }
      const candidate = await candidateService.findById(voteData.candidateId);
      return candidate;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new VoteService();
