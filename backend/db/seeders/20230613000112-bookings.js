'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
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

    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
