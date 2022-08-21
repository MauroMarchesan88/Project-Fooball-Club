import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UsersModel from '../database/models/UsersModel';

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

describe('Endpoint /login', () => {
  beforeEach(() => sinon.stub(UsersModel, 'findOne').resolves(user as UsersModel));

  afterEach(()=>(UsersModel.findOne as sinon.SinonStub).restore());

  it('Verificar se retorna 200 com os dados corretos', async () => {
    const response = await chai.request(app)
    .post('/login')
    .send(validAdmin)
    
    expect(response.status).to.equal(200);
  });

  it('Verificar se retorna 200 com os dados incorretos', async () => {
    const response = await chai.request(app)
    .post('/login')
    .send(adminNoPwd)
    
    expect(response.status).to.equal(400);
  });

  it('Verificar se retorna 200 com os dados incorretos', async () => {
    const response = await chai.request(app)
    .post('/login')
    .send(adminBadPwd)
    
    expect(response.status).to.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });
});
