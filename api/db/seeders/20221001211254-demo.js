function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Incomes', [
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },

      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      },
      {
        description: `Grana recebida do cliente ${between(100, 1)}`,
        value: between(100000, 1),
        date: new Date(),
        createdAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Incomes', null, {});

  }
};
