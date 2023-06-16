'use strict';
const { Model, Validator } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId'
      })
      User.hasMany(models.Review, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Booking, {
        foreignKey: 'userId'
      })
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   get() {
      //     return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      //   },
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   get() {
      //     return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      //   },
      // }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      }
    }
  );
  return User;
};