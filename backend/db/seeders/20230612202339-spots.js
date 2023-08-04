'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "865 Wines Lane",
        city: "Salinas",
        state: "California",
        country: "United States",
        lat: 30.051216,
        lng: -95.390831,
        name: "Hacienda House on Vineyard - Pool, Hot Tub & Sauna",
        description: "Retreat to this beautiful 20 acre Hacienda set on a boutique organic vineyard and olive orchard in the Pastures of Heaven. This luxurious 6 bedroom vacation rental and its impeccably maintained grounds are the perfect location for your next celebration or retreat. With large common spaces, state of the art kitchen, and expansive outdoor amenities, this home was designed for entertaining.",
        price: 188
      },
      {
        ownerId: 1,
        address: "867 Wines Lane",
        city: "Houston",
        state: "Texas",
        country: "United States",
        lat: 30.051207,
        lng: -95.390822,
        name: "Bellacollina Farms Beautiful Briones Retreat",
        description: "Beautiful Briones ~ Bay Area Retreat.",
        price: 195
      },
      {
        ownerId: 2,
        address: "2655 285 Stratford Park",
        city: "Evansville",
        state: "Indiana",
        country: "United States",
        lat: 38.029121,
        lng: -87.584869,
        name: "Crow's Nest",
        description: "Located high in the redwoods of Monte Rio, the Crow's Nest provides a birds eye view of the old growth forest surrounding the property. Take in the stunning views from our patio, the hot tub, or through the many large windows in the cabin.",
        price: 300
      },
      {
        ownerId: 3,
        address: "4797 Chestnut Street",
        city: "Tampa",
        state: "Florida",
        country: "United States",
        lat: 28.022614,
        lng: -82.455887,
        name: "Safe, Steps To Beach, Spa, Near Harbor, Pets Okay!",
        description: "This unique beach house is one block from Twin Lakes beach, the finest one in Santa Cruz! It is a 2-story, designer home with an open floorplan, gridwork of glass to allow in plenty of light and offers ocean peeks. ",
        price: 200
      },
      {
        ownerId: 4,
        address: "1475 Lee Avenue",
        city: "Camden",
        state: "New Jersey",
        country: "United States",
        lat: 39.897949,
        lng: -75.044334,
        name: "Unbelievable Views of Lake in Marla Bay,",
        description: "Enter the private community of Marla Bay, and drive through the quiet streets to the end of a road. There you will find a fenced entrance to a home with the most spectacular views in Lake. The design is a mix of classic Tahoe nostalgia and modern amenities. Enter the home through the gated fence and naturally landscaped front yard to the right of the house. Open the door to wood cathedral ceilings and large windows facing unbelievable views of Lake.",
        price: 160
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
