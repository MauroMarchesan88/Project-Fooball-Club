import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const teams = await MatchesService.getTeams();
    return res.status(200).json(teams);
  }

  // static async findByPk(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const team = await MatchesService.findByPk(id);
  //   return res.status(200).json(team);
  // }
}

export default MatchesController;
