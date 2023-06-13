'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: '/Images/01.webp',
        preview: true
      }, {
        spotId: 2,
        url: '/Images/02.webp',
        preview: true
      },
      {
        spotId: 3,
        url: '/Images/03.webp',
        preview: true
      },
      {
        spotId: 4,
        url: '/Images/04.webp',
        preview: true
      },
      {
        spotId: 5,
        url: '/Images/05.webp',
        preview: true
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
