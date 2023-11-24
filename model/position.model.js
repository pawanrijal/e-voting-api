module.exports = (sequelize, type) => {
  return sequelize.define(
    "positions",
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
    },
    {
      timestamps: true,
    }
  );
};
