'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
       {
        full_name: "User",
        password: "$2b$10$ZFHp.5p2slf8p5Bcxlsef.qSJAR48sDDtLrvmpH63D1KuyVyDa5u6",
        profile_pic: "",
        email: "user@gmail.com",
        reset_password_token: null, 
        reset_password_expires: null, 
        device_token: null, 
        role_id: 1,
        otp_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
        },
        {
        full_name: "Admin",
        password: "$2b$10$ZFHp.5p2slf8p5Bcxlsef.qSJAR48sDDtLrvmpH63D1KuyVyDa5u6",
        profile_pic: "",
        email: "admin@gmail.com",
        reset_password_token: null, 
        reset_password_expires: null, 
        device_token: null, 
        role_id: 2,
        otp_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
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
