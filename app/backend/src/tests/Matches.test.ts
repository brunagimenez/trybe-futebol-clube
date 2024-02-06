import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Request, Response } from 'express';

import SequelizeMatches from '../database/models/SequelizeMatches';
import JwtUtils from '../utils/jwt.util';
import { idMatche, matchCreate, matchValid, matche, matches, matchesFalse, matchesTrue } from './mocks/Matches.mocks';
import { invalidToken, tokenMockError, validToken } from './mocks/Validation.mocks';
import Validations from '../middlewares/Validations';
import MatchesService from '../service/MatchesService';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/IMatches';
import MatchesController from '../controller/MatchesController';

chai.use(chaiHttp);

const { expect } = chai;

describe('All matches ', function() {
    it('should return all matches', async function() {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
  
      const { status, body } = await chai.request(app).get('/matches');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matches);
    })
    it('should filter inProgress True and return matches', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(matchesTrue as any);
  
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesTrue);

      });
      it('should filter inProgress True and return matches', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(matchesFalse as any);
  
        const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    
        expect(status).to.equal(200);
        expect(body).to.deep.equal(matchesFalse);

      });
    afterEach(sinon.restore);
  });
  describe('Update a matches ', function() {
  it('error update a matche, is without the token ', async function () {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matche as any);
    sinon.stub(SequelizeMatches, 'update').resolves(idMatche as any);
    const { status, body } = await chai.request(app).patch('/matches/1/finish');
  
    expect(status).to.equal(401);
    expect(body).to.deep.equal(tokenMockError);
  });
  it('invalid token for update a matche', async function () {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matche as any);
    sinon.stub(SequelizeMatches, 'update').resolves(idMatche as any);
    
    sinon.stub(Validations, 'validateJwt').callsFake((req, res, next) => {
      return next();
    });
  
    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${invalidToken}`);
  
    expect(status).to.equal(401);
    expect(body.message).to.deep.equal('Token must be a valid token');
  });
  it('update a matche', async function () {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(matche as any);
    sinon.stub(SequelizeMatches, 'update').resolves(idMatche as any);
    sinon.stub(JwtUtils.prototype, 'verify').resolves();  
  
    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${validToken}`);
  
    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Finalizado');
  });
  afterEach(sinon.restore);
  });
  describe('Create a match ', function() {
    it('should create a match', async function() {
  
      sinon.stub(SequelizeMatches, 'create').resolves(matchCreate as any);
      sinon.stub(JwtUtils.prototype, 'verify').resolves();  
  
  
      const { status, body } = await chai.request(app).post('/matches')
        .send(matchValid)
        .set('Authorization', `Bearer ${validToken}`);
  
      expect(status).to.equal(201);
      expect(body).to.deep.equal(matchCreate);
    });
  });