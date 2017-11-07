'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories',
    [
      {
      category_name: 'Social',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Politic',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Game',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Technology',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Otomotif',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Tutorial',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Internet',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Design',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Linux',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      category_name: 'Healthy',
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
