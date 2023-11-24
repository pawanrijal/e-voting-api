const positionService = require("../services/position.service");
const successResponse = require("../utils/successResponse");

class PositionController {
  async create(req, res, next) {
    try {
      const position = await positionService.create(req.body);

      successResponse(res, 200, position, "position Created");
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const positionData = await positionService.update(req.body, id);
      successResponse(res, 200, positionData, "position updated");
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
      const positionData = await positionService.findAll(option);
      const meta = {
        limit: option.limit,
        offset: option.offset,
        total: positionData.total,
      };
      successResponse(res, 200, positionData.data, "position fetched", meta);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const positionData = await positionService.findById(id, req.user);
      successResponse(res, 200, positionData, "position fetched");
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const positionData = await positionService.delete(id, req.user);
      successResponse(res, 200, positionData, "position Deleted");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PositionController();
