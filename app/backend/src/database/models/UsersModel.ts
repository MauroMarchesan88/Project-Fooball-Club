import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class UsersModel extends Model {
  // public <campo>!: <tipo>;
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UsersModel.init({
  // ... Campos
  id: {
    type: INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(100),
    allowNull: false,
    unique: true,
  },
  role: {
    type: STRING(),
    allowNull: false,
  },
  email: {
    type: STRING(),
    allowNull: false,
  },
  password: {
    type: STRING(),
    allowNull: false,
  },
}, {
  // ... Outras configs
  sequelize: db,
  modelName: 'UsersModel',
  tableName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default UsersModel;
