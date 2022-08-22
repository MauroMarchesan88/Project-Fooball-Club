import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const validAdmin = { email: 'admin@admin.com', password: 'secret_admin' };
const adminNoPwd = { email: 'admin@admin.com', password: '' };
const adminBadPwd = { email: 'admin@admin.com', password: 'secret' };

const user = {
  "id": 1,
  "username": "Admin",
  "role": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjYxMTkxNzY3fQ.gF9H1rRAk4I8JNOBe6bSLmBTphk2l0V2vhWyLuJe0SA'

describe('Endpoint /login', () => {
  beforeEach(() => sinon.stub(UsersModel, 'findOne').resolves(user as UsersModel));

  afterEach(()=>(UsersModel.findOne as sinon.SinonStub).restore());

  let chaiHttpResponse: Response;

  it('Verificar se retorna 200 com os dados corretos', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(validAdmin)
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna 200 com os dados incorretos', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(adminNoPwd)
    
    expect(chaiHttpResponse.status).to.equal(400);
  });

  it('Verificar se retorna 200 com os dados incorretos', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(adminBadPwd)
    
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('Verificar se valida login', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/validate')
    .set('authorization', token)
    
    expect(chaiHttpResponse.status).to.equal(200);
  });
});
