'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 2,
        spotId: 1,
        review: "This was an awesome spot!",
        stars: 5,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 2,
        spotId: 2,
        review: "This was an awesome spot!",
        stars: 5,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      // {
      //   userId: 3,
      //   spotId: 3,
      //   review: "This was an awesome spot!",
      //   stars: 5,
      //   createdAt: 'Now',
      //   updatedAt: 'Now'
      // },
      // {
      //   userId: 4,
      //   spotId: 4,
      //   review: "This was an awesome spot!",
      //   stars: 5,
      //   createdAt: 'Now',
      //   updatedAt: 'Now'
      // },
      // {
      //   userId: 5,
      //   spotId: 5,
      //   review: "This was an awesome spot!",
      //   stars: 5,
      //   createdAt: 'Now',
      //   updatedAt: 'Now'
      // }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
