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

      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/054fc676-dbd1-4d5c-b45d-efaaa1d3b2ae.jpg?im_w=1200',
        preview: true
      }, {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/3e35e91e-4cca-4a4f-819a-cdeb45ae91e3.jpg?im_w=1440',
        preview: false
      }, {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/fafe942f-f0c5-451a-a0cf-81ffb7ae16f7.jpg?im_w=720',
        preview: false
      }, {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/18baf1e0-5370-4211-a0df-0e082cf529fa.jpg?im_w=720',
        preview: false
      }, {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/35ed1594-b188-4034-8f1c-d21f1f47a147.jpg?im_w=720',
        preview: false
      },

      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-26569326/original/c7010049-df5a-4773-9383-02ac17707200.jpeg?im_w=720',
        preview: true
      }, {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-26569326/original/a8ef0ca1-9bc9-49c0-a024-55d536297158.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-26569326/original/f790ade7-4074-4a0f-bde0-d5b3193028cf.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-26569326/original/19e568a1-7502-41cd-ae6f-7a972c30b43f.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-26569326/original/ee0d44d9-be34-4df2-b3a8-7c00e028293b.jpeg?im_w=720',
        preview: false
      },

      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Select-33747689/original/e9b089e9-5a1a-4135-a597-1166421fc804?im_w=720',
        preview: true
      }, {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Select-33747689/original/2903e59d-01f8-4c0d-9d19-e119f0c2d603?im_w=720',
        preview: false
      }, {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-33747689/original/c8252478-62de-465e-bdbb-31ef8b32c828.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-33747689/original/73eb02df-4c22-4013-966c-22fdff03e2e2.jpg?im_w=720',
        preview: false
      }, {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Select-33747689/original/cc988345-5ddc-4723-8c3c-2eca6f4054f3?im_w=720',
        preview: false
      },

      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53630298/original/fc04d5cb-0ae4-4d42-a886-8e4e91048b5a.jpeg?im_w=720',
        preview: true
      }, {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53630298/original/36662146-d29b-4f13-841b-41c62b2a7920.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53630298/original/f50f3c45-57ed-47f0-b90d-bbf15d02f93b.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53630298/original/af2e3ce2-983c-4cc2-b806-7ba9a7adfcf0.jpeg?im_w=720',
        preview: false
      }, {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53630298/original/522016e5-3338-40c2-9466-a798216b4f3f.jpeg?im_w=720',
        preview: false
      },

      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/b954f356-d621-4294-8b89-cabd762d84f5.jpg?im_w=720',
        preview: true
      }, {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/f8c150b2-c1b9-4b4e-b386-7b6a05c5e289.jpg?im_w=720',
        preview: false
      }, {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/58d7f3c1-75e3-4db3-ba74-43dd5372acc8.jpg?im_w=720',
        preview: false
      }, {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/3ee3c653-4aa7-4806-baed-f7c0b3bda7b7.jpg?im_w=720',
        preview: false
      }, {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/241825a1-7409-409b-b1f9-ae723e2ff5bc.jpg?im_w=720',
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

