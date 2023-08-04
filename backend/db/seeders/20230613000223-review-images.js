'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/af2afea0-396d-43e4-8d21-4de3e67b326c.jpg?im_w=1200'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/3d0045c4-6667-4e81-b918-16a8b7f5f718.jpg?im_w=1200'
      },
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/ec8cc256-2930-44c8-8e06-a01059ced30d.jpg?im_w=1200'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
