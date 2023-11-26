module.exports = (sequelize, type) => {
  return sequelize.define(
    "candidates",
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
      status: {
        type: type.INTEGER,
        default: 0, //1-approved,0-disapproved
      },
      manifesto: {
        type: type.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
