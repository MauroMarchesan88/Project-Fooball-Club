import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /matches', () => {
  beforeEach(() => sinon.restore());

  afterEach(()=>sinon.restore());
  
  let chaiHttpResponse: Response;

  it('Verificar se retorna 200', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves()
    chaiHttpResponse = await chai.request(app).get('/matches');
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna 200 com os dados corretos', async () => {
    sinon.stub(MatchesModel, 'create').resolves()
    chaiHttpResponse = await chai.request(app).get('/matches');
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna 200 ao alterar gols', async () => {
    sinon.stub(MatchesModel, 'update').resolves()
    chaiHttpResponse = await chai.request(app)
    .patch('/matches/2')
    .send({ homeTeamGoals: 50, awayTeamGoals:32 });
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna 200 se o jogo acabar', async () => {
    sinon.stub(MatchesModel, 'update').resolves()
    chaiHttpResponse = await chai.request(app).patch('/matches/42/finish');
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  // it('Verificar se retorna 200 com os dados incorretos', async () => {
  //   const response = await chai.request(app)
  //   .post('/matches')
  //   .send(adminBadPwd)
    
  //   expect(response.status).to.equal(401);
  //   expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  // });
});
