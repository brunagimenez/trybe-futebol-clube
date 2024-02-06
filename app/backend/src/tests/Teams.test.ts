import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/SequelizeTeams';
import { app } from '../app';
import { team, teams } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('All Teams Test', () => {
    it('should return all teams', async function() {
        sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);
    
        const { status, body } = await chai.request(app).get('/teams');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(teams);
      })
    afterEach(sinon.restore); 
});
describe('Team Test ID', function() {
    it('should return a team by id', async function() {
      sinon.stub(SequelizeTeams, 'findOne').resolves(team as any);
  
      const { status, body } = await chai.request(app).get('/teams/1');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(team);
    });
    it('should return not found if the book doesn\'t exists', async function() {
      sinon.stub(SequelizeTeams, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).get('/teams/1');
  
      expect(status).to.equal(404);
      expect(body.message).to.equal('Team 1 not found');
    });
    afterEach(sinon.restore);
  });