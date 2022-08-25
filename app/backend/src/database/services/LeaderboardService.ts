import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import megaZort from '../Utils/megaZort';
import { addScores, addGoals, awayGoals, awayScores } from '../Utils/supportCalculations';

export default class LeaderboardService {
  static async getAllHome() {
    const allTeams = await TeamsModel.findAll({ attributes: { exclude: ['teamName'] } });
    const leaderboard = await Promise.all(allTeams.map(async (team) => {
      const allMatches = await MatchesModel.findAll({
        include: [
          { model: TeamsModel, as: 'teamHome' }],
        where: { inProgress: false, homeTeam: team.id } });
      const scores = addScores(allMatches);
      const goals = addGoals(allMatches);
      const efficiency = ((scores.totalPoints / (scores.totalGames * 3)) * 100).toFixed(2);
      const teamScore = { name: allMatches[0].teamHome?.teamName, ...scores, ...goals, efficiency };
      return teamScore;
    }));
    const leaderboardSorted = megaZort(leaderboard);
    return leaderboardSorted;
  }

  static async getAllAway() {
    const allTeams = await TeamsModel.findAll({ attributes: { exclude: ['teamName'] } });
    const leaderboard = await Promise.all(allTeams.map(async (team) => {
      const allMatches = await MatchesModel.findAll({
        include: [
          { model: TeamsModel, as: 'teamAway' }],
        where: { inProgress: false, awayTeam: team.id } });
      const scores = awayScores(allMatches);
      const goals = awayGoals(allMatches);
      const efficiency = ((scores.totalPoints / (scores.totalGames * 3)) * 100).toFixed(2);
      const teamScore = { name: allMatches[0].teamAway?.teamName, ...scores, ...goals, efficiency };
      return teamScore;
    }));
    const leaderboardSorted = megaZort(leaderboard);
    return leaderboardSorted;
  }

  static async getAll() {
    const home = await this.getAllHome();
    const away = await this.getAllAway();
    for (let index = 0; index < home.length; index += 1) {
      const homeAway = away.find((team) => team.name === home[index].name);
      home[index].totalPoints += homeAway.totalPoints;
      home[index].totalGames += homeAway.totalGames;
      home[index].totalVictories += homeAway.totalVictories;
      home[index].totalDraws += homeAway.totalDraws;
      home[index].totalLosses += homeAway.totalLosses;
      home[index].goalsFavor += homeAway.goalsFavor;
      home[index].goalsOwn += homeAway.goalsOwn;
      home[index].goalsBalance = home[index].goalsFavor - home[index].goalsOwn;
      home[index].efficiency = (
        (home[index].totalPoints / (home[index].totalGames * 3)) * 100).toFixed(2);
    }
    const leaderboard = megaZort(home);
    return leaderboard;
  }
}
