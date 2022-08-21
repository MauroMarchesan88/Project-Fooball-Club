import UserModel from '../models/UsersModel';
import IUser from '../Interfaces/User.interface';

export default class UserService {
  static async getUsers() {
    return UserModel.findAll();
  }

  static async findOne(email: string) {
    return UserModel.findOne({ where: { email } });
  }

  static async createUser(user: IUser) {
    return UserModel.create({
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    });
  }
}
