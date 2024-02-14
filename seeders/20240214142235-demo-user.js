'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
       {
        fullName: "User",
        password: "",
        profilePic: "$2b$10$ZFHp.5p2slf8p5Bcxlsef.qSJAR48sDDtLrvmpH63D1KuyVyDa5u6",
        email: "user@gmail.com",
        resetPasswordToken: null, 
        resetPasswordExpires: null, 
        deviceToken: null, 
        roleId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
        },
         {
        fullName: "Admin",
        password: "",
        profilePic: "$2b$10$ZFHp.5p2slf8p5Bcxlsef.qSJAR48sDDtLrvmpH63D1KuyVyDa5u6",
        email: "admin@gmail.com",
        resetPasswordToken: null, 
        resetPasswordExpires: null, 
        deviceToken: null, 
        roleId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
