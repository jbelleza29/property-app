'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userIds = await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { firstName: 'Jane', lastName: 'Deo', createdAt: new Date(),
          updatedAt: new Date() },
        { firstName: 'Lorem', lastName: 'Ipsum', createdAt: new Date(),
          updatedAt: new Date() },
      ],
      { returning: ["id"]},
    );

    await queryInterface.bulkInsert('Properties', [
      {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        rent: 2500,
        userId: userIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '456 Elm St',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        rent: 3000,
        userId: userIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '789 Oak St',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        rent: 2200,
        userId: userIds[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '1010 Maple St',
        city: 'Houston',
        state: 'TX',
        zip: '77001',
        rent: 1800,
        userId: userIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '1313 Pine St',
        city: 'Miami',
        state: 'FL',
        zip: '33101',
        rent: 2800,
        userId: userIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '1414 Cedar St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94101',
        rent: 3500,
        userId: userIds[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '1717 Walnut St',
        city: 'Seattle',
        state: 'WA',
        zip: '98101',
        rent: 2400,
        userId: userIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '1818 Birch St',
        city: 'Boston',
        state: 'MA',
        zip: '02101',
        rent: 3200,
        userId: userIds[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '2020 Cherry St',
        city: 'Atlanta',
        state: 'GA',
        zip: '30301',
        rent: 2600,
        userId: userIds[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        street: '2323 Oak St',
        city: 'Denver',
        state: 'CO',
        zip: '80201',
        rent: 2100,
        userId: userIds[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Properties', null, {});
  },
};
