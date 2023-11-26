const { candidate, position } = require("../lib/database.connection");
const { notFoundException } = require("../exceptions/notFound.exception");

class CandidateService {
  async create(payload) {
    let data = await candidate.create(payload);
    return data;
  }

  async findAll(option) {
    const returnData = await candidate.findAll({
      ...option,
      include: [position],
    });

    const total = await candidate.count();
    return { data: returnData, total };
  }

  async findById(id) {
    const candidateData = await candidate.findOne({
      where: { id },
      include: [position],
    });
    if (candidateData === null || candidateData === undefined)
      throw new notFoundException("candidate");
    return candidateData;
  }
  async delete(id) {
    await this.findById(id);
    const returnData = await candidate.destroy({ where: { id } });
    return returnData;
  }

  // decision as approve/reject
  async decision(payload, id) {
    const candidateData = await this.findById(id);
    candidateData.status = payload.status;
    const returnData = await candidateData.save();
    return returnData;
  }
}

module.exports = new CandidateService();
