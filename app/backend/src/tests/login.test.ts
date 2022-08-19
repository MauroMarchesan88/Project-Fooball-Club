import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import UsersModel from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

const usersArray = [
  {
    "id": 1,
    "username": "Admin",
    "role": "admin",
    "email": "admin@admin.com",
    "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  },
  {
    "id": 2,
    "username": "User",
    "role": "user",
    "email": "user@user.com",
    "password": "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
  }
];

const validAdmin = { email: 'admin@admin.com', password: 'secret_admin' };

describe('Endpoint /users', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  after(()=>{
    sinon.restore();
  })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Verificar se retorna 200', async () => {
    sinon.stub(UsersModel, 'findAll').resolves([]);

    const response = await chai.request(app)
    .get('/users')
    
    expect(response.status).to.equal(200);

    sinon.restore();

  });

  it('Verificar se retorna array de users', async () => {
    sinon.stub(UsersModel, 'findAll').resolves(usersArray);

    const response = await chai.request(app)
    .get('/users')
    
    expect(response.body).to.be.deep.equal(usersArray);
  });
});
