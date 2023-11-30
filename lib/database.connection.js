const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/user.model");
const Role = require("../model/role.model");
const Election = require("../model/election.model");
const Position = require("../model/position.model");
const Candidate = require("../model/candidate.model");
const Vote = require("../model/vote.model");

const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
      max: 20,
      idle: 30000,
      min: 5,
    },
    define: {
      underscored: true,
    },
  }
);
//model instance created
const userModel = User(sequelize, Sequelize.DataTypes);
const roleModel = Role(sequelize, Sequelize.DataTypes);
const electionModel = Election(sequelize, Sequelize.DataTypes);
const positionModel = Position(sequelize, Sequelize.DataTypes);
const candidateModel = Candidate(sequelize, Sequelize.DataTypes);
const voteModel = Vote(sequelize, Sequelize.DataTypes);

roleModel.hasMany(userModel);
userModel.belongsTo(roleModel);

electionModel.hasMany(positionModel);
positionModel.belongsTo(electionModel);

positionModel.hasMany(candidateModel);
candidateModel.belongsTo(positionModel);

candidateModel.belongsTo(userModel);

voteModel.belongsTo(candidateModel);
voteModel.belongsTo(userModel);
voteModel.belongsTo(positionModel);

const db = {};
db.user = userModel;
db.role = roleModel;
db.sequelize = sequelize;
db.election = electionModel;
db.position = positionModel;
db.candidate = candidateModel;
db.vote = voteModel;
module.exports = db;
