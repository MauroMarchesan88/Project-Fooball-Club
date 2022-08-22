import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async getAllHome(_req: Request, res: Response) {
    const teams = await LeaderboardService.getAllHome();
    return res.status(200).json(teams);
  }
}

export default LeaderboardController;
