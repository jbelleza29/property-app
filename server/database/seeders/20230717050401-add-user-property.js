'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [{
      firstName: 'John',
      lastName: 'Doe'
    }, { firstName: 'Jane', lastName: 'Deo' }, { firstName: 'Lorem', lastName: 'Ipsum' }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
