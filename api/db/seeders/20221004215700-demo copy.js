function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Expenses', [
      {
      description: `Compra feita na loja ${between(100, 1)}`,
      value: between(100000, 1),
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      },

      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: `Compra feita na loja ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {});

  }
};
