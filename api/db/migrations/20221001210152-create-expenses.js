'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING,
        defaultValue: "Outros"
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Expenses');
  }
};