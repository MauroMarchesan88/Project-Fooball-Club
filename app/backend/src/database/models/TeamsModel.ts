import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class TeamsModel extends Model {
  // public <campo>!: <tipo>;
  id!: number;
  teamName!: string;
}

TeamsModel.init({
  // ... Campos
  id: {
    type: INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  // ... Outras configs
  sequelize: db,
  modelName: 'TeamsModel',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default TeamsModel;
