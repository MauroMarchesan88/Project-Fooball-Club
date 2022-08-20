import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import ITeam from '../database/Interfaces/Team.interface';

chai.use(chaiHttp);

const { expect } = chai;

const team: ITeam = {
    id:1,
    teamName: 'Avaí/Kindermann',
  };

describe('Endpoint /Teams', () => {
  beforeEach(() => {
    sinon.stub(TeamsModel, 'findAll').resolves([team as TeamsModel]);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Verificar se retorna 200', async () => {
    const response = await chai.request(app)
    .get('/teams')
    
    expect(response.status).to.equal(200);
  });

  it('Verificar se retorna Team', async () => {
    const response = await chai.request(app)
    .get('/teams')
    
    expect(response.body).to.be.deep.equal([team]);
  });
});
