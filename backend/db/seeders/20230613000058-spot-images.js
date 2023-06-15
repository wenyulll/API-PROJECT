'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: '../../../images/.webp',
        preview: true
      }, {
        spotId: 2,
        url: '../../images/02.webp',
        preview: true
      },
      {
        spotId: 3,
        url: '../../../images/03.webp',
        preview: true
      },
      {
        spotId: 4,
        url: '../../../images/04.webp',
        preview: true
      },
      {
        spotId: 5,
        url: '../../../images/05.webp',
        preview: true
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
