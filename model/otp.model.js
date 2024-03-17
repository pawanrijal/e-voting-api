module.exports = (sequelize, type) => {
  return sequelize.define(
    "user_otps",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        otp: {
            type: type.STRING,
            allowNull: false,
            },
      verified: {
        type: type.BOOLEAN,
        default: false,
      },
        userId: {
            type: type.INTEGER,
            allowNull: false,
        },
        expiresAt: {
            type: type.DATE,
            allowNull: true,
        },
        
    },
    {
      timestamps: true,
    }
  );
};
