import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import TeamsService from './TeamsService';

export default class MatchesService {
  static async getTeams() {
    return MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  static async verifyTeams(teams: { homeTeam: number, awayTeam: number }) {
    await TeamsService.findByPk(teams.homeTeam);
    await TeamsModel.findByPk(teams.awayTeam);
  }

  static async create(body: {
    homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number }) {
    await this.verifyTeams({ homeTeam: body.homeTeam, awayTeam: body.awayTeam });

    const match = {
      homeTeam: body.homeTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeam: body.awayTeam,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    };

    return MatchesModel.create(match);
  }

  static async update(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    return MatchesModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
  }

  static async updateFinish(id: string) {
    return MatchesModel.update({ inProgress: false }, {
      where: { id },
    });
  }
}
