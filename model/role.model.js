module.exports = (sequelize, type) => {
  return sequelize.define(
    "roles",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: type.STRING,
      },
      description: {
        type: type.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
