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
      startDate: {
        type: type.STRING,
        allowNull: false,
      },
      endDate: {
        type: type.STRING,
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
