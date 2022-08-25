import MatchesModel from '../models/MatchesModel';

export function addScores(allMatches: MatchesModel[]) {
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

export function awayScores(allMatches: MatchesModel[]) {
  const result = {
    totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0 };
  for (let index = 0; index < allMatches.length; index += 1) {
    if (allMatches[index].awayTeamGoals > allMatches[index].homeTeamGoals) {
      result.totalPoints += 3;
      result.totalVictories += 1;
    }
    if (allMatches[index].awayTeamGoals < allMatches[index].homeTeamGoals) result.totalLosses += 1;
    if (allMatches[index].awayTeamGoals === allMatches[index].homeTeamGoals) {
      result.totalPoints += 1;
      result.totalDraws += 1;
    }
    result.totalGames += 1;
  }
  return result;
}

export function addGoals(allMatches: MatchesModel[]) {
  const result = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };
  for (let index = 0; index < allMatches.length; index += 1) {
    result.goalsFavor += allMatches[index].homeTeamGoals;
    result.goalsOwn += allMatches[index].awayTeamGoals;
  }
  result.goalsBalance = result.goalsFavor - result.goalsOwn;
  return result;
}

export function awayGoals(allMatches: MatchesModel[]) {
  const result = { goalsFavor: 0, goalsOwn: 0, goalsBalance: 0 };
  for (let index = 0; index < allMatches.length; index += 1) {
    result.goalsFavor += allMatches[index].awayTeamGoals;
    result.goalsOwn += allMatches[index].homeTeamGoals;
  }
  result.goalsBalance = result.goalsFavor - result.goalsOwn;
  return result;
}
