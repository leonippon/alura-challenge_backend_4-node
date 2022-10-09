'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {

    static associate(models) {

    }
  }
  Expenses.init({

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4
    },

    description: {
      type: DataTypes.STRING
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Outros',
      validate: {
        isIn: [['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outros']]
      }
    },

    value: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },

    date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    }

  }, {
    sequelize,
    paranoid: true,
    modelName: 'Expenses',
  });

  return Expenses;
};