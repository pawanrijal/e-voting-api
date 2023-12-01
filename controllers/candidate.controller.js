const candidateService = require("../services/candidate.service");
const successResponse = require("../utils/successResponse");

class CandidateController {
  async create(req, res, next) {
    try {
      const candidate = await candidateService.create(req.body, req.user);
      successResponse(res, 200, candidate, "candidate Created");
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const option = {};
      if (limit != null && offset != null) {
        option.limit = parseInt(limit);
        option.offset = parseInt(offset);
      }
      option.order = [["createdAt", "DESC"]];

      const candidateData = await candidateService.findAll(req.user, option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: candidateData.total,
      };
      successResponse(res, 200, candidateData.data, "candidate fetched", meta);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const candidateData = await candidateService.findById(id, req.user);
      successResponse(res, 200, candidateData, "candidate fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const candidateData = await candidateService.delete(id, req.user);
      successResponse(res, 200, candidateData, "candidate Deleted");
    } catch (err) {
      next(err);
    }
  }
  async decision(req, res, next) {
    try {
      const { id } = req.params;
      const candidateData = await candidateService.decision(
        req.body,
        id,
        req.user
      );
      successResponse(res, 200, candidateData, "candidate edited");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CandidateController();
