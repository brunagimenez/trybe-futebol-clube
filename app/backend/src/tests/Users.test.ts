import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { invalidSendUser, sendUser, token, userEmail, userMock } from './mocks/Users.mock';
import JwtUtils from '../utils/jwt.util';


chai.use(chaiHttp);

const { expect } = chai;

describe('Users token ', function() {
    it('return token', async function() {
  
      sinon.stub(SequelizeUsers, 'findOne').resolves(userMock as any);
      sinon.stub(JwtUtils.prototype, 'sign').returns(token);  
  
  
      const { status, body } = await chai.request(app).post('/login')
        .send(sendUser);
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({token});
    });
    afterEach(sinon.restore); 
    it('returns error if sent without email', async function() {
  
        sinon.stub(SequelizeUsers, 'findOne').resolves(invalidSendUser as any);
    
        const { status, body } = await chai.request(app).post('/login')
          .send(invalidSendUser);
    
        expect(status).to.equal(401);
        expect(body.message).to.deep.equal('Invalid email or password');
      });
  });