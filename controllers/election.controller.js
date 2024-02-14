const electionService = require("../services/election.service");
const successResponse = require("../utils/successResponse");

class ElectionController {
  async create(req, res, next) {
    try {
      const user = await req.user;
      const currentDate = new Date();
      const endDate = new Date(currentDate.getTime() + parseInt(req.body.time) * 60000);
      req.body.endDate = endDate;
      req.body.startDate = currentDate;
      const election = await electionService.create(req.body, user);

      successResponse(res, 200, election, "Election Created");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
        const currentDate = new Date();
      const endDate = new Date(currentDate.getTime() + parseInt(req.body.time) * 60000);
      req.body.endDate = endDate;
      req.body.startDate = currentDate;
      const electionData = await electionService.update(
        req.body,
        id,
        await req.user
      );
      successResponse(res, 200, electionData, "Election updated");
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
      const electionData = await electionService.findAll(req.user, option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: electionData.total,
      };
      successResponse(res, 200, electionData.data, "election fetched", meta);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const electionData = await electionService.findById(id, req.user);
      successResponse(res, 200, electionData, "Election fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const electionData = await electionService.delete(id, req.user);
      successResponse(res, 200, electionData, "Election Deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ElectionController();
