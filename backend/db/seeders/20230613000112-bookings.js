'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-04-14',
        endDate: '2023-04-16'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-04-18',
        endDate: '2023-04-19'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-05-01',
        endDate: '2023-05-05'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-07-11',
        endDate: '2023-07-15'
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2023-07-18',
        endDate: '2023-07-20'
      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2023-10-01',
        endDate: '2023-10-07'
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
