// import Team from '../Interfaces/Team.interface';
import MatchesModel from '../models/MatchesModel';
// import TeamsModel from '../models/TeamsModel';

export default class UserService {
  static async getAllHome() {
    const [teamsHome] = await MatchesModel.findAll({ where: { inProgress: false } });
    console.log(teamsHome);
    // const teamsHomeNames = [];
    // for(let index = 0; index < teamsHome.length; index += 1) {
    //   await TeamsModel.findByPk({teamsHome[index].id});

    // }
    return 'ok';
  }
}
