import 'express-async-errors';

import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const routers: Router = Router();

routers.get('/leaderboard/home', (req: Request, res: Response) =>
  LeaderboardController.getAllHome(req, res));
routers.get('/leaderboard/away', (req: Request, res: Response) =>
  LeaderboardController.getAllaway(req, res));
routers.get('/leaderboard', (req: Request, res: Response) =>
  LeaderboardController.getAll(req, res));
export default routers;
