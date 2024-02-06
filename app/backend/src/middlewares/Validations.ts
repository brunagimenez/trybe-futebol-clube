import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Email from '../validations/Email';
import { ILogin } from '../Interfaces/ILogin';
import JwtUtils from '../utils/jwt.util';

class Validations {
  private static passwordMinLength = 6;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }
    if (!Email.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    if (password.length < 6) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    next();
  }

  static validateJwt(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const data = authorization.split(' ');
      new JwtUtils().verify(data[1]) as JwtPayload;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  }

  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    return next();
  }
}

export default Validations;
