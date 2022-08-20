import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamsService.getTeams();
    return res.status(200).json(teams);
  }

  static async findByPk(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.findByPk(id);
    return res.status(200).json(team);
  }
}

export default TeamsController;
