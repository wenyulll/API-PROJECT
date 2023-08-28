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
        address: "822 Stock Lane",
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
      {
        ownerId: 2,
        address: "9313 Pacific St",
        city: "Plymouth",
        state: "California",
        country: "United States",
        lat: 41.958447,
        lng: -75.044334,
        name: "Wine Country Loft at Spirit Oaks Farm",
        description: "Beautiful air conditioned loft located in the Sierra Foothills of Amador County. Stroll through the 16 acre property and enjoy trees, flowers, herbs birds and more.  Relax in the claw foot tub and sleep deeply on the memory foam king mattress. ",
        price: 122
      },
      //spot 7
      {
        ownerId: 2,
        address: "92301 Hardies Ln",
        city: "Santa Rosa",
        state: "California",
        country: "United States",
        lat: 38.460320,
        lng: -122.735847,
        name: "Spectacular Sonoma Vineyard Estate",
        description: "This fabulous 7-bdrm, 5.5 bath vineyard estate sits on 45 acres in the heart of Sonoma's wine country. This is perfect for a family gathering, friends getaways, or offsite work venue. The property is fully furnished with gourmet kitchen, pool, hot tub, 75.TV and 50 MBS internet access all included in rental.This is a high- quality home with modern finishes, oriental carpets, a fully - equipped kitchen and amenities ",
        price: 1761
      },
      //spot 8
      {
        ownerId: 2,
        address: "92301 Hardies Ln",
        city: "Los Angeles",
        state: "California",
        country: "United States",
        lat: 34.052235,
        lng: -118.243683,
        name: "Beautiful Bedroom in West LA Architectural Gem",
        description: "Bedroom is located in our home's back window.200 sq.ft.private bedroom with backyard garden view. King- size bed & luxury linens.Adjacent private bathroom with rain shower. ",
        price: 175
      },
      //spot 9
      {
        ownerId: 3,
        address: "129 Paseo Del Pueblo Norte",
        city: "El Prado",
        state: "New Mexico",
        country: "United States",
        lat: 36.444099,
        lng: -105.581589,
        name: "Taos Skybox 'Stargazer' High Desert Retreat",
        description: "Set on 30 acres of private land on the western edge of town, Taos Skybox 'Stargazer' is a unique vacation home experience, purpose-built to take advantage of the dark skies and endless vistas of the high desert landscape. Sitting at 7,000 ft. above sea level, views abound, as your retreat borders Taos Pueblo Native lands, yet is only 15 minutes from the Taos Plaza. Truly a memorable destination, Stargazer is modern and well-equipped with a full kitchen, laundry, and fiber optic i ",
        price: 175
      },
      //spot 10
      {
        ownerId: 4,
        address: "92301 Hardies Ln",
        city: "Sea Ranch",
        state: "California",
        country: "United States",
        lat: 38.725990,
        lng: -123.465750,
        name: "Historic Baker House available for the first time",
        description: "As seen in Dwell, Turnbull's Baker House is a Sea Ranch classic Binker Barn resting on 2 acres of redwoods. While it was built in 1968, it's been updated to make sure you have everything you need for a private and relaxing stay: the separate office has monitors and 300+ Mbps internet, the kitchen is fully-equipped, and the garage has a level 2 EV charger and a Peloton. Enjoy the outdoors year-round from the hot tub or the Galanter & Jones heated furniture that overlooks the forest and ocean. ",
        price: 808
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
