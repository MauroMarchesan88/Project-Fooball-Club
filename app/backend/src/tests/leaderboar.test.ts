import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import matchesAwayResolve from './utils/matchesAwayResolve';
import matchesHomeResolve from './utils/matchesHomeResolve';
chai.use(chaiHttp);

const { expect } = chai;

const teamsResolve = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16}];


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjYxMTkxNzY3fQ.gF9H1rRAk4I8JNOBe6bSLmBTphk2l0V2vhWyLuJe0SA'

describe('Endpoint /leaderboard', () => {
  beforeEach(() => sinon.restore());

  afterEach(()=> sinon.restore());

  let chaiHttpResponse: Response;

  it('Verificar se retorna 200 na rota leaderboard/home', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsResolve as TeamsModel[])
    sinon.stub(MatchesModel, 'findAll').resolves(matchesHomeResolve as unknown as MatchesModel[])
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/home')
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna 200 na rota leaderboard/away', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsResolve as TeamsModel[])
    sinon.stub(MatchesModel, 'findAll').resolves(matchesAwayResolve as unknown as MatchesModel[])
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/away')
    
    expect(chaiHttpResponse.status).to.equal(200);
  });
});