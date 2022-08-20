import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  static async getTeams() {
    return TeamsModel.findAll();
  }

  static async findByPk(id: string) {
    return TeamsModel.findByPk(id);
  }
}
