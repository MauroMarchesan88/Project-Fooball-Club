import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  id!: number;
  teamName!: string;
}

TeamsModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'TeamsModel',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
