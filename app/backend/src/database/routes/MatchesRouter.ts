import 'express-async-errors';

import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const routers: Router = Router();

routers.get('/matches', (req: Request, res: Response) => MatchesController.getAll(req, res));
routers.post('/matches', (req: Request, res: Response) =>
  MatchesController.saveInProgress(req, res));
// routers.get('/matches/search', (req: Request, res: Response) =>
//   MatchesController.getInProgress(req, res));
routers.patch('/matches/:id', (req: Request, res: Response) => MatchesController.update(req, res));
routers.patch('/matches/:id/finish', (req: Request, res: Response) =>
  MatchesController.updateFinish(req, res));

export default routers;
