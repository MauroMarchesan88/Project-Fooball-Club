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
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    if (!authorization || !validateToken(authorization)) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const team = await MatchesService.create(req.body);

    if (team) {
      return res.status(201).json(team);
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await MatchesService.update(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(match);
  }

  static async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.updateFinish(id);
    return res.status(200).json({ message: 'Finished' });
  }
}

export default MatchesController;
