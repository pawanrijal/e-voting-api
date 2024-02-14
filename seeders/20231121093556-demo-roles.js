"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "User",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        // {
        //   name: "Candidate",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
