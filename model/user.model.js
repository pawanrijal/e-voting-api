module.exports = (sequelize, type) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: type.STRING,
        allowNull: false,
      },
      password: {
        type: type.STRING,
        allowNull: false,
      },
      profilePic: {
        type: type.TEXT,
        allowNull: true,
      },
      email: {
        type: type.STRING,
        unique: true,
        allowNull: false,
      },
      resetPasswordToken: {
        type: type.STRING,
        allowNull: true,
      },
      resetPasswordExpires: {
        type: type.DATE,
        allowNull: true,
      },
      deviceToken: {
        type: type.TEXT,
        allowNull: true,
      },
      roleId: {
        type: type.INTEGER,
        default: 1,
      },
      otpVerified: {
        type: type.BOOLEAN,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
