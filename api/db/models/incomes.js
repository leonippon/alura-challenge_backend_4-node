'use strict';
const {
  Model, UUIDV1
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incomes extends Model {

    static associate(models) {

    }
  }
  Incomes.init({

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },

    description: {
      type: DataTypes.STRING
    },

    value: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },

    date:  {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    }

  }, {
    sequelize,
    paranoid: true,
    modelName: 'Incomes',
  });

  return Incomes;
};