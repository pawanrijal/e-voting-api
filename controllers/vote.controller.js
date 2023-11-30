const VoteService = require("../services/vote.service");
const successResponse = require("../utils/successResponse");

require("dotenv").config();

class VoteController {
  async voteCandidate(req, res, next) {
    try {
      req.body.userId = req.user.id;
      const voteData = await VoteService.voteCandidate(req.body);
      successResponse(res, 200, voteData, "Successfully Voted");
    } catch (err) {
      next(err);
    }
  }

  async getVotedCandidate(req, res, next) {
    try {
      req.body.userId = req.user.id;
      req.body.positionId = req.params.positionId;
      const voteData = await VoteService.getVotedCandidate(req.body);
      successResponse(res, 200, voteData, "Successfully Fetched");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new VoteController();
