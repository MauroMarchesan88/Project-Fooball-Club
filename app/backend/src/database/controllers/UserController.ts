import bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { createToken, validateToken } from '../Utils/jwt';
import validateLogin from '../Utils/validation';

class UserController {
  static async getAll(_req: Request, res: Response) {
    const user = await UserService.getUsers();
    return res.status(200).json(user);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    validateLogin({ email, password });
    const user = await UserService.findOne(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    const token = createToken(email, password);
    return res.status(200).json({ token });
  }

  static async validateLogin(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const validated = validateToken(authorization);
      const user = await UserService.findOne(validated.email);
      if (user) {
        return res.status(200).json({ role: user.role });
      }
    }
  }
}

export default UserController;
