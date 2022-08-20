import 'express-async-errors';

import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const routers: Router = Router();

routers.get('/teams', (req: Request, res: Response) => TeamsController.getAll(req, res));
routers.get('/teams/:id', (req: Request, res: Response) => TeamsController.findByPk(req, res));

export default routers;
