'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

    }
  }
  User.init({

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },

    username: { 
      type: DataTypes.STRING,
      allowNull: false
      },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });

  return User;
};