import 'express-async-errors';

import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const routers: Router = Router();

routers.get('/matches', (req: Request, res: Response) => MatchesController.getAll(req, res));
routers.post('/matches', (req: Request, res: Response) =>
  MatchesController.saveInProgress(req, res));

// routers.get('/matches/:id', (req: Request, res: Response) => MatchesController.findByPk(req, res));

export default routers;
