'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "This was an good spot!",
        stars: 3,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 2,
        spotId: 1,
        review: "This was an nice spot!",
        stars: 5,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 2,
        spotId: 2,
        review: "This was an awesome spot!",
        stars: 4,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 3,
        spotId: 3,
        review: "This was an great spot!",
        stars: 4,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 4,
        spotId: 4,
        review: "This was an fabulous spot!",
        stars: 5,
        createdAt: 'Now',
        updatedAt: 'Now'
      },
      {
        userId: 5,
        spotId: 5,
        review: "This was an wonderful spot!",
        stars: 4,
        createdAt: 'Now',
        updatedAt: 'Now'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
