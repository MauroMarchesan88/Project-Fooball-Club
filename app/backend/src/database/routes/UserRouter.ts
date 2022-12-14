import 'express-async-errors';

import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const routers: Router = Router();

routers.get('/users', (req: Request, res: Response) => UserController.getAll(req, res));
routers.get('/login/validate', (req: Request, res: Response) =>
  UserController.validateLogin(req, res));
routers.post('/login', (req: Request, res: Response) => UserController.login(req, res));

export default routers;
