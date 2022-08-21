'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        field: 'home_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'teams', key: 'id',
        },
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      awayTeam: {
        field: 'away_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'teams', key: 'id',
        },
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches');
  }
};
