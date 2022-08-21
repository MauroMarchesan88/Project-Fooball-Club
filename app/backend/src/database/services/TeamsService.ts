import TeamsModel from '../models/TeamsModel';
import HttpException from '../Utils/httpErrorClass';

export default class TeamsService {
  static async getTeams() {
    return TeamsModel.findAll();
  }

  static async findByPk(id: number) {
    const team = await TeamsModel.findByPk(id);
    if (!team) {
      throw new HttpException(404, 'There is no team with such id!');
    }
    return team;
  }
}
