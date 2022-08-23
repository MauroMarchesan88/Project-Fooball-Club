import TeamScore from '../Interfaces/TeamScore.interface';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

function addScores(allMatches: MatchesModel[]) {
  const result = {
    totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0 };
  for (let index = 0; index < allMatches.length; index += 1) {
    if (allMatches[index].homeTeamGoals > allMatches[index].awayTeamGoals) {
      result.totalPoints += 3;
      result.totalVictories += 1;
    }
    if (allMatches[index].homeTeamGoals < allMatches[index].awayTeamGoals) result.totalLosses += 1;
    if (allMatches[index].homeTeamGoals === allMatches[index].awayTeamGoals) {
      result.totalPoints += 1;
      result.totalDraws += 1;
    }
    result.totalGames += 1;
  }
  return result;
}

function addGoals(allMatches: MatchesModel[]) {
  const result = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };
  for (let index = 0; index < allMatches.length; index += 1) {
    result.goalsFavor += allMatches[index].homeTeamGoals;
    result.goalsOwn += allMatches[index].awayTeamGoals;
  }
  result.goalsBalance = result.goalsFavor - result.goalsOwn;
  return result;
}

function megaZort(leaderboard: TeamScore[]) {
  leaderboard.sort((a, b) => {
    if (Number(a.totalPoints) > Number(b.totalPoints)) return -1;
    if (Number(a.totalPoints) < Number(b.totalPoints)) return 1;
    return 0;
  });
  leaderboard.sort((a, b) => {
    if (Number(a.totalVictories) > Number(b.totalVictories)) return -1;
    if (Number(a.totalVictories) < Number(b.totalVictories)) return 1;
    return 0;
  });
  leaderboard.sort((a, b) => {
    if (Number(a.goalsBalance) > Number(b.goalsBalance)) return -1;
    if (Number(a.goalsBalance) < Number(b.goalsBalance)) return 1;
    return 0;
  });
  return leaderboard;
}

export default class UserService {
  static async getAllHome() {
    const allTeams = await TeamsModel.findAll({ attributes: { exclude: ['teamName'] } });
    const leaderboard: TeamScore[] = await Promise.all(allTeams.map(async (team) => {
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
}
