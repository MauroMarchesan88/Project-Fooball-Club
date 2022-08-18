import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const routers: Router = Router();

// const courseController = new CourseController();
routers.get('/users', (req: Request, res: Response) => UserController.getAll(req, res));
routers.post('/login', (req: Request, res: Response) => UserController.login(req, res));

export default routers;
