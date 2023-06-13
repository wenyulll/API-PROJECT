'use strict';
// const bcrypt = require("bcryptjs");

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;  // define your schema in options object
// }

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        "ownerId": 1,
        "address": "865 Wines Lane",
        "city": "Houston",
        "state": "Texas",
        "country": "United States",
        "lat": 30.051216,
        "lng": -95.390831,
        "name": "Walk to the Beach from this Ocean Front Home",
        "description": "Your beachfront escape awaits you.",
        "price": 200
      },
      {
        "ownerId": 2,
        "address": "867 Wines Lane",
        "city": "Houston",
        "state": "Texas",
        "country": "United States",
        "lat": 32.051426,
        "lng": -92.390844,
        "name": "Bellacollina Farms Beautiful Briones Retreat",
        "description": "Beautiful Briones ~ Bay Area Retreat.",
        "price": 200
      },
      {
        "ownerId": 3,
        "address": "2655 285 Stratford Park",
        "city": "Evansville",
        "state": "Indiana",
        "country": "United States",
        "lat": 38.029121,
        "lng": -87.584869,
        "name": "The Little House",
        "description": "The Little House is a quaint place to stay during your time in the South Jersey area .",
        "price": 199
      },
      {
        "ownerId": 4,
        "address": "4797 Chestnut Street",
        "city": "Tampa",
        "state": "Florida",
        "country": "United States",
        "lat": 28.022614,
        "lng": -82.455887,
        "name": "BestRest #4 NEAR NYC/NEWARK AIRPORT/OUTLET MALL",
        "description": "YBRAND NEW BUILDING! Close to NYC, Gardens OUTLET Mall, Kean University, Trinitas Hospital, Prudential Center.",
        "price": 198
      },
      {
        "ownerId": 5,
        "address": "1475 Lee Avenue",
        "city": "Camden",
        "state": "New Jersey",
        "country": "United States",
        "lat": 39.897949,
        "lng": -75.044334,
        "name": "Sean's Homestead,the Green Room",
        "description": "Beautiful bedroom in an old world in the heart of historic Jersey City",
        "price": 197
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      city: { [Op.in]: ['Camden', 'Tampa', 'Evansville'] }
    }, {});
  }
};
