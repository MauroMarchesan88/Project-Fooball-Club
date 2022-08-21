import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

export default class MatchesService {
  static async getTeams() {
    return MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
  }

  static async create(body: {
    homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number }) {
    // const teamHome = await TeamsModel.findByPk(body.homeTeam);
    // console.log(typeof teamHome?.teamName);
    // const teamAway = await TeamsModel.findByPk(body.awayTeam);
    // console.log(teamAway);

    const match = {
      homeTeam: body.homeTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeam: body.awayTeam,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    };

    return MatchesModel.create(match);
  }
}
