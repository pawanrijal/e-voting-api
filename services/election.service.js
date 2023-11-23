const { election } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");

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
    const returnData = await election.findAll({
      ...option,
    });
    const total = await election.count();
    return { data: returnData, total };
  }

  async findById(id) {
    const electionData = await election.findOne({
      where: { id },
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
