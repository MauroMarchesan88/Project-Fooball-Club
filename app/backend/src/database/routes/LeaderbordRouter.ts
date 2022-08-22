import 'express-async-errors';

import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const routers: Router = Router();

routers.get('/leaderboard/home', (req: Request, res: Response) =>
  LeaderboardController.getAllHome(req, res));

export default routers;
