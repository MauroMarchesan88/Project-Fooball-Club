import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import { validateToken } from '../Utils/jwt';

class MatchesController {
  static async getAll(_req: Request, res: Response) {
    const teams = await MatchesService.getTeams();
    return res.status(200).json(teams);
  }

  static async saveInProgress(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      validateToken(authorization);
      const team = await MatchesService.create(req.body);

      if (team) {
        return res.status(201).json(team);
      }
    }
  }
}

export default MatchesController;
