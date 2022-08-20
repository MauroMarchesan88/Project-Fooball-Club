import MatchesModel from '../models/MatchesModel';

export default class TeamsService {
  static async getTeams() {
    return MatchesModel.findAll();
  }

  // static async findByPk(id: string) {
  //   return MatchesModel.findByPk(id);
  // }
}
