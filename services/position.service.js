const { position, election } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");
const electionService = require("./election.service");

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
      include: [election],
    });

    const total = await position.count();
    return { data: returnData, total };
  }

  async findById(id) {
    const positionData = await position.findOne({
      where: { id },
      include: [election],
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
}

module.exports = new PositionService();
