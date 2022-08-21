'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamName: {
        field: 'team_name',
        allowNull: false,
        type: Sequelize.STRING
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};
