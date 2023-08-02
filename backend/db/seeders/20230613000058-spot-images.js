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
        url: 'https://a0.muscache.com/im/pictures/79e04e6d-14fd-4bab-84f0-b1bac2f367f2.jpg?im_w=960',
        preview: true
      }, {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/306e3896-bd14-4994-9c0d-680920118e89.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/e8859747-a529-43ea-b8ba-2becdd107219.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/9186306a-3b6c-4606-a6d0-873083db1add.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/e8ed6b5f-499b-42f9-9445-758a7ea64729.jpg?im_w=1200',
        preview: false
      },


      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40426632/original/dd8e6156-1226-4a1b-8aff-06b42c1f55a5.jpeg?im_w=960',
        preview: true
      }, {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40426632/original/013d490a-4754-4b01-8f0c-4118cff05feb.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40426632/original/1baab7c7-d667-4885-bc62-0ffdab91e583.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40426632/original/e685190a-9adc-40f5-b4e4-3fb7d43f8dd7.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-40426632/original/df672ba9-1157-43c4-acb5-934782d00bee.jpeg?im_w=1200',
        preview: false
      },

      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/591332b4-8d5b-4e1e-858c-273221c3e160.jpg?im_w=960',
        preview: true
      }, {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/0878b298-8b23-436f-84d1-c9b1f0a1222a.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/075bf9ef-a1a6-4f94-9124-ee7c5429a51b.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/4e8e7ba9-9926-4398-8e2a-86466a576ef5.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/270d26d7-9cdd-42d6-a40b-a3e749a61821.jpg?im_w=1200',
        preview: false
      },

      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/37425e33-8fd5-4869-8ea9-e5b2cb5db9f9.jpg?im_w=960',
        preview: true
      }, {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/daf50e32-1537-462e-a21c-f0aabeb6e431.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/92127462/9d975964_original.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/fbe4dc89-a6df-4664-af0d-322156e5f500.jpg?im_w=1200',
        preview: false
      }, {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/53370696-770c-4c84-9479-444027000dca.jpg?im_w=1200',
        preview: false
      },


      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/690b372f-08ea-4711-8071-854b0648f56f.jpeg?im_w=960',
        preview: true
      }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/9b94a864-5978-4cc6-be0a-4a8a739c353e.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/f194696c-e7b5-4e84-aa52-5024bf5438fe.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/ddeecd1f-ad56-4ef7-992f-e4ebc9a3bbbe.jpeg?im_w=1200',
        preview: false
      }, {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/ec1b3040-1b70-4cec-b0c3-ff7e9f40adcb.jpeg?im_w=1200',
        preview: false
      },
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

