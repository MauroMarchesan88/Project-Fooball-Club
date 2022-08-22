import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import User from '../database/Interfaces/User.interface';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const user: User = {
    "id": 1,
    "username": "Admin",
    "role": "admin",
    "email": "admin@admin.com",
    "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  };

describe('Endpoint /users', () => {
  beforeEach(() => {
    sinon.restore();
  });

  afterEach(()=>{
    sinon.restore();
  })

  let chaiHttpResponse: Response;

  it('Verificar se retorna 200', async () => {
    sinon.stub(UsersModel, 'findAll').resolves([user as UsersModel]);
    chaiHttpResponse = await chai.request(app)
    .get('/users')
    
    expect(chaiHttpResponse.status).to.equal(200);

    sinon.restore();
  });

  it('Verificar se retorna user', async () => {
    sinon.stub(UsersModel, 'findAll').resolves([user as UsersModel]);
    chaiHttpResponse = await chai.request(app)
    .get('/users')
    
    expect(chaiHttpResponse.body).to.be.deep.equal([user]);
  });
});
