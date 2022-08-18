import bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { createToken } from '../Utils/jwt';
import validateLogin from '../Utils/validation';

class UserController {
  // constructor() {
  //   this.service = new UserService();
  // }

  static async getAll(_req: Request, res: Response) {
    const user = await UserService.getUsers();
    return res.status(200).json(user);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    validateLogin({ email, password });
    const user = await UserService.findOne(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400).json({ message: 'Unauthorized' });
    }
    const token = createToken(email, password);
    return res.status(200).json({ token });
  }

  //   public async create(req: Request, res: Response) {
  //     const user = await this.service.createUser(req.body);
  //     return res.status(200).json(user);
  //   }
}

export default UserController;
