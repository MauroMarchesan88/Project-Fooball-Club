import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UsersModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'UsersModel',
  tableName: 'users',
  timestamps: false,
});

export default UsersModel;
