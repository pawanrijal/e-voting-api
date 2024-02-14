module.exports = (sequelize, type) => {
  return sequelize.define(
    "elections",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: type.STRING,
        allowNull: false,
      },
      description: {
        type: type.STRING,
        allowNull: true,
      },
      time:{
        type: type.STRING,
        allowNull: false,
      },
      startDate: {
        type: type.DATE,
        allowNull: false,
      },
      endDate: {
        type: type.DATE,
        allowNull: false,
      },
      status: {
        type: type.INTEGER, //1-active 0-inactive
        default: 1,
      },
      createdBy: {
        type: type.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
