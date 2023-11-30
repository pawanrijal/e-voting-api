module.exports = (sequelize, type) => {
  return sequelize.define(
    "votes",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
