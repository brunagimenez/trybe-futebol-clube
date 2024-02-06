import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';
import { matches } from './mocks/Matches.mocks';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { teams } from './mocks/Team.mocks';
import { leaderboard } from './mocks/LeaderboardHome.mock';
import arrayLeaderboard from '../utils/rulesLeaderboard/arrayLeaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('All Leaderboard Home ', function() {
    it('should return all Leaderboard', async function() {
        sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
        sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    
        const { status, body } = await chai.request(app).get('/leaderboard/home');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(leaderboard);
    
      });
  afterEach(sinon.restore);
});
